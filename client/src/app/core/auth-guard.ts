// src/app/core/auth.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from './supabase';

// The guard is now an async function, which allows us to use 'await'.
export const authGuard: CanActivateFn = async (route, state) => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  // We will no longer use the signal here. We need the real-time, awaited value.
  // We directly ask the Supabase client for the current session state.
  const { data } = await supabase.client.auth.getSession();

  if (data.session) {
    // If getSession() returns a valid session, the user is logged in.
    return true;
  } else {
    // If there is no session, we redirect to the login page.
    return router.parseUrl('/');
  }
};