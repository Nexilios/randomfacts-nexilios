import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://cqhhozqaxhoqwhionmao.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxaGhvenFheGhvcXdoaW9ubWFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5NDUyMzIsImV4cCI6MjAyNDUyMTIzMn0.LAWwCXl4GDyMCCxzIG291fQmPBP0xxDr49Xs9W7FHPY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
