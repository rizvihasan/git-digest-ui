// src/app/pages/dashboard/dashboard.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // We need ReactiveFormsModule for our form
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  private formBuilder = inject(FormBuilder);

  submissionMessage = '';

  // I'm defining the form for the repository URL input.
  repoForm = this.formBuilder.group({
    // The URL is required and must follow a specific pattern.
    repoUrl: ['', [
      Validators.required, 
      Validators.pattern('^https:\/\/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-._]+$')
    ]]
  });

  handleSubmit(): void {
    if (this.repoForm.invalid) {
      return;
    }

    const url = this.repoForm.value.repoUrl;
    this.submissionMessage = `Submitting repository: ${url}...`;

    // TODO: In the next step, I will call our API service from here.
    console.log('Form submitted with URL:', url);
  }
}