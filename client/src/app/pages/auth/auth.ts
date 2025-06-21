// src/app/pages/auth/auth.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  // I'm importing the modules my HTML template needs to function.
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss'
})
export class AuthComponent {
  // This is a modern way to inject Angular's FormBuilder tool.
  private formBuilder = inject(FormBuilder);

  errorMessage = '';

  // I'm defining my form structure here.
  // It has two controls, 'email' and 'password', and both are required.
  signInForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  handleSignIn(): void {
    // I will add the real sign-in logic here in the next step.
    console.log('Form submitted!', this.signInForm.value);
    this.errorMessage = 'Sign-in logic not yet implemented.';
  }

  handleGitHubSignIn(): void {
    // I will add the real GitHub sign-in logic here in the next step.
    console.log('GitHub Sign In clicked!');
  }
}