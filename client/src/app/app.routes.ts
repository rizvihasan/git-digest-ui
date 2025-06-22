// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { authGuard } from './core/auth-guard';

export const routes: Routes = [
  // When a user visits the main page, show them the AuthComponent
  { path: '', component: AuthComponent },

  // 2. This was the missing route for our dashboard page
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
];