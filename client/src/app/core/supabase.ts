// src/app/core/supabase.ts

import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router'; // 1. Import the Router
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  public readonly client: SupabaseClient;
  private router = inject(Router); // 2. Inject the Router

  constructor() {
    this.client = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    // 3. This is our global listener for any authentication event.
    this.client.auth.onAuthStateChange((event, session) => {
      // We only care about the SIGNED_IN event for this logic.
      if (event === 'SIGNED_IN') {
        console.log('SupabaseService: User signed in, navigating to dashboard.');
        // When a user signs in (via any method), navigate them to the dashboard.
        this.router.navigate(['/dashboard']);
      }
    });
  }
}