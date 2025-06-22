// src/app/pages/dashboard/dashboard.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../core/api'; // 1. Import our new ApiService

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {
  private formBuilder = inject(FormBuilder);
  private apiService = inject(ApiService); // 2. Inject the ApiService

  submissionMessage = '';

  repoForm = this.formBuilder.group({
    repoUrl: ['', [
      Validators.required, 
      Validators.pattern('^https:\/\/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-._]+$')
    ]]
  });

  handleSubmit(): void {
    if (this.repoForm.invalid) return;

    const url = this.repoForm.value.repoUrl as string;
    this.submissionMessage = `Submitting repository: ${url}...`;

    // 3. I'm now calling the service and subscribing to the result.
    this.apiService.submitJob(url).subscribe({
      next: (response) => {
        // This runs if the API call is successful
        this.submissionMessage = `Success! Your job has been submitted.`;
        console.log('API Response:', response);
      },
      error: (error) => {
        // This runs if the API call fails
        this.submissionMessage = `Error: ${error.error?.message || 'Failed to submit job.'}`;
        console.error('API Error:', error);
      }
    });
  }
}