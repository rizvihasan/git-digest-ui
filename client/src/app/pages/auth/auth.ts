// src/app/pages/auth/auth.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../core/supabase'; // I'm importing our service.

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss'
})
export class AuthComponent {
  private formBuilder = inject(FormBuilder);
  // I'm injecting the SupabaseService so I can use it.
  private supabase = inject(SupabaseService);

  errorMessage = '';

  signInForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  // This is the updated sign-in logic.
  async handleSignIn(): Promise<void> {
    if (this.signInForm.invalid) return;
    this.errorMessage = '';

    try {
      const email = this.signInForm.value.email as string;
      const password = this.signInForm.value.password as string;

      // I'm calling the Supabase client to sign in the user.
      const { error } = await this.supabase.client.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        this.errorMessage = error.message;
      } else {
        // In a real app, I would navigate to the dashboard here.
        // For now, an alert is fine for testing.
        alert('Login successful! (Check console for user session)');
      }
    } catch (error: any) {
      this.errorMessage = error.message || 'An unexpected error occurred.';
    }
  }

  // This is the updated GitHub sign-in logic.
  async handleGitHubSignIn(): Promise<void> {
    this.errorMessage = '';
    try {
      // I'm calling the Supabase client to start the GitHub OAuth flow.
      const { error } = await this.supabase.client.auth.signInWithOAuth({
        provider: 'github',
      });

      if (error) {
        this.errorMessage = error.message;
      }
    } catch (error: any) {
      this.errorMessage = error.message || 'An unexpected error occurred.';
    }
  }
}