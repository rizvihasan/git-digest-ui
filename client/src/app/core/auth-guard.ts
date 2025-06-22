// src/app/core/auth.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from './supabase';

export const authGuard: CanActivateFn = (route, state) => {
  // I'm injecting my services here in the modern functional way.
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  // I'm using the isLoggedIn signal we created in the service.
  if (supabase.isLoggedIn()) {
    return true; // If the user is logged in, allow them to access the route.
  } else {
    // If not logged in, redirect them to the home (login) page.
    return router.parseUrl('/');
  }
};