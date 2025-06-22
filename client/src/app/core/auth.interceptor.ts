// src/app/core/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SupabaseService } from './supabase';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const supabase = inject(SupabaseService);

  // I only want to intercept calls to my own API (which start with /api).
  if (!req.url.startsWith('/api')) {
    return next(req);
  }

  // getSession() is async, so I convert its Promise to an Observable using 'from'.
  return from(supabase.client.auth.getSession()).pipe(
    // switchMap waits for the session and then continues the request.
    switchMap(({ data: { session } }) => {
      if (session) {
        // If the session exists, I'll clone the request to add the Authorization header.
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${session.access_token}`
          }
        });
        // Then I pass the new, authorized request to the next handler.
        return next(authReq);
      }
      // If there's no session, I'll pass the original request along.
      return next(req);
    })
  );
}; 