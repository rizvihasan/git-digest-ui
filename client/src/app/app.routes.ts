// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
  // When a user visits the main page, show them the AuthComponent
  { path: '', component: AuthComponent },

  // 2. This was the missing route for our dashboard page
  { path: 'dashboard', component: Dashboard }
];