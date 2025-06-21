// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Auth } from './pages/auth/auth';
export const routes: Routes = [
  // When a user visits the main page, show them the AuthComponent
  { path: '', component: Auth}
];