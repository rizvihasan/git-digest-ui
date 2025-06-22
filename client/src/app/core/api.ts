// src/app/core/api.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);

  // This function will send the repo URL to our serverless function.
  submitJob(repoUrl: string): Observable<any> {
    const endpoint = '/api/submit-job'; // The path to our serverless function
    const body = { repoUrl };
    return this.http.post(endpoint, body);
  }
}