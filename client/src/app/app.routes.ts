// src/app/app.routes.ts
import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { authGuard } from './core/auth-guard';
import { SupabaseService } from './core/supabase';

export const routes: Routes = [
  {
    path: '',
    canActivate: [
      () => {
        const supabase = inject(SupabaseService);
        const router = inject(Router);
        if (supabase.isLoggedIn()) {
          return router.parseUrl('/dashboard');
        }
        return true;
      }
    ],
    component: AuthComponent
  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
];