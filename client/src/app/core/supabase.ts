// src/app/core/supabase.ts

import { Injectable, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient, Session } from '@supabase/supabase-js';
import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  public readonly client: SupabaseClient;
  private router = inject(Router);

  // I'm creating a writable signal to hold the session state.
  private readonly _session: WritableSignal<Session | null> = signal(null);

  // I'm exposing a read-only version for components to use safely.
  public readonly session: Signal<Session | null> = this._session.asReadonly();

  // This computed signal will be true if the user is logged in.
  public readonly isLoggedIn: Signal<boolean> = computed(() => !!this.session());

  constructor() {
    this.client = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this.client.auth.onAuthStateChange((event, session) => {
      this._session.set(session); // Update the signal on any auth change.

      if (event === 'SIGNED_IN') {
        this.router.navigate(['/dashboard']);
      }

      if (event === 'SIGNED_OUT') {
        this.router.navigate(['/']); // On sign out, go back to the login page.
      }
    });
  }

  // This is our new sign-out method.
  async signOut(): Promise<void> {
    await this.client.auth.signOut();
    // The onAuthStateChange listener will handle the navigation automatically.
  }
}