// src/app/app.ts
import { Component, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SupabaseService } from './core/supabase';
import { Session } from '@supabase/supabase-js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  // I'm injecting my service to get access to the session.
  private supabase = inject(SupabaseService);

  // I'm creating local signals that are linked to the service's signals.
  isLoggedIn: Signal<boolean> = this.supabase.isLoggedIn;
  session: Signal<Session | null> = this.supabase.session;

  handleLogout(): void {
    this.supabase.signOut();
  }
}