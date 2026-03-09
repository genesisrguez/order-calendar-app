import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://oohkpffyqgvieoyuakbe.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vaGtwZmZ5cWd2aWVveXVha2JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5OTEwNjYsImV4cCI6MjA4ODU2NzA2Nn0.vXqri2rcRsOzNqB9T6E7_q6j1MuzlKT3IK7GTJiLy4o"

export const supabase = createClient(supabaseUrl, supabaseKey)