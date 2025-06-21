// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth';
export const routes: Routes = [
  // When a user visits the main page, show them the AuthComponent
  { path: '', component: AuthComponent }
];