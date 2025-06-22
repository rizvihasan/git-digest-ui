// src/app/pages/auth/auth.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../core/supabase';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss'
})
export class AuthComponent {
  private formBuilder = inject(FormBuilder);
  private supabase = inject(SupabaseService);
  // We are not using the router directly here anymore, so we can remove it.
  // private router = inject(Router);

  errorMessage = '';

  signInForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  async handleSignUp(): Promise<void> {
    if (this.signInForm.invalid) return;
    this.errorMessage = '';
    try {
      const email = this.signInForm.value.email as string;
      const password = this.signInForm.value.password as string;

      const { data, error } = await this.supabase.client.auth.signUp({
        email,
        password,
      });

      if (error) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'Success! Please check your email for a confirmation link.';
      }
    } catch (error: any) {
      this.errorMessage = error.message || 'An unexpected error occurred during sign-up.';
    }
  }

  async handleSignIn(): Promise<void> {
    if (this.signInForm.invalid) return;
    this.errorMessage = '';
    try {
      const email = this.signInForm.value.email as string;
      const password = this.signInForm.value.password as string;

      const { error } = await this.supabase.client.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        this.errorMessage = error.message;
      }
      // The navigation is now handled by the SupabaseService listener.
    } catch (error: any) {
      this.errorMessage = error.message || 'An unexpected error occurred during sign-in.';
    }
  }

  async handleGitHubSignIn(): Promise<void> {
    this.errorMessage = '';
    try {
      // This is the correct, complete code for the GitHub sign-in.
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