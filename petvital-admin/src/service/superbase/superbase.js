// // supabase.js
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'https://your-project.supabase.co';
// const supabaseKey = 'your-anon-key'; // Found in Project → Settings → API
// export const supabase = createClient(supabaseUrl, supabaseKey);

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://wkjxjkbsvgchzdvhlpnc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indranhqa2JzdmdjaHpkdmhscG5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3Mjk4MDAsImV4cCI6MjA2MzMwNTgwMH0.rsMbFQSppXMUV4tMAu8ughzAVb73XXXVe45CWq7p94E";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
