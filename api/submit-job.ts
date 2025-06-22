// api/submit-job.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Octokit } from '@octokit/rest';

// This is the main function that will be executed when the API is called.
export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // I only want to allow POST requests to this endpoint.
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Only POST requests allowed' });
  }

  try {
    // --- 1. Get data from the frontend ---
    const { repoUrl } = request.body;
    if (!repoUrl) {
      return response.status(400).json({ message: 'repoUrl is required' });
    }

    // --- 2. Authenticate with GitHub ---
    const githubToken = process.env.GITHUB_PAT;
    if (!githubToken) {
      // This is a server-side error, so I'll send a 500 status.
      return response.status(500).json({ message: 'GitHub token not configured on the server.' });
    }
    const octokit = new Octokit({ auth: githubToken });

    // --- 3. Trigger the GitHub Action Workflow ---
    // I need to replace these placeholders with my own details.
    const owner = 'rizvihasan'; // <--- IMPORTANT: REPLACE THIS
    const repo = 'git-digest-processor';    // The name of our backend repo
    const workflow_id = 'test.yml';         // The filename of our workflow
    const ref = 'develop';                  // The branch to run the workflow on

    await octokit.actions.createWorkflowDispatch({
      owner,
      repo,
      workflow_id,
      ref,
      inputs: {
        // This is how I pass the URL from the frontend to the action.
        repo_url: repoUrl,
      },
    });

    // --- 4. Send a success response back to the frontend ---
    return response.status(202).json({ message: 'Workflow dispatched successfully.' });

  } catch (error: any) {
    console.error(error); // It's good practice to log the actual error on the server.
    return response.status(500).json({ message: error.message || 'An internal server error occurred.' });
  }
}