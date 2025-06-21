// client/src/app/core/supabase.ts

import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  public readonly client: SupabaseClient;

  constructor() {
    // I'm initializing the Supabase client here, using the keys
    // from our environment file. This is the only place this will happen.
    this.client = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }
}