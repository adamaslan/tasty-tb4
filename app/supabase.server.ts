import { createClient } from '@supabase/supabase-js';
import invariant from 'tiny-invariant';

invariant(
  process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY,
  'Supabase credentials not found in environment variables'
);

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);