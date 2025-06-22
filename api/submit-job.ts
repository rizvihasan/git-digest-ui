// api/submit-job.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Octokit } from '@octokit/rest';
import { createClient } from '@supabase/supabase-js';

// Initialize the server-side Supabase client with the secret service_role key
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Only POST requests allowed' });
  }

  try {
    // --- 1. Get the authenticated user ---
    const jwt = request.headers.authorization?.split(' ')[1];
    if (!jwt) {
      return response.status(401).json({ message: 'Authorization token not found.' });
    }
    const { data: { user }, error: userError } = await supabase.auth.getUser(jwt);
    if (userError || !user) {
      return response.status(401).json({ message: 'Invalid token.' });
    }

    // --- 2. Get repoUrl and create a new job record in the database ---
    const { repoUrl } = request.body;
    if (!repoUrl) {
      return response.status(400).json({ message: 'repoUrl is required' });
    }

    const { data: newJob, error: insertError } = await supabase
      .from('jobs')
      .insert({
        user_id: user.id,
        repo_url: repoUrl,
        status: 'queued'
      })
      .select()
      .single();

    if (insertError) {
      throw insertError; // This will be caught by the main catch block
    }

    // --- 3. Trigger the GitHub Action Workflow ---
    const octokit = new Octokit({ auth: process.env.GITHUB_PAT });
    const owner = 'rizvihasan';
    const repo = 'git-digest-processor';
    const workflow_id = 'test.yml';
    const ref = 'develop';

    await octokit.actions.createWorkflowDispatch({
      owner,
      repo,
      workflow_id,
      ref,
      inputs: {
        repo_url: repoUrl,
        job_id: newJob.id.toString(),
      },
    });

    // --- 4. Send a success response ---
    return response.status(202).json({ message: 'Job created and workflow dispatched.', jobId: newJob.id });

  } catch (error: any) {
    console.error(error);
    return response.status(500).json({ message: error.message || 'An internal server error occurred.' });
  }
}