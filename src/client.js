import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kqdawhewimlyakfhzzso.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxZGF3aGV3aW1seWFrZmh6enNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxNjQxNzAsImV4cCI6MjAyODc0MDE3MH0.wPzVjebaiUroccRtWKPgGLeGJ0l-00e2ajH3L7T74is'
export const supabase = createClient(supabaseUrl, supabaseKey)