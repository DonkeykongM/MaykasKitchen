/*
  # Fix newsletter subscribers RLS policy

  1. Changes
    - Drop existing policy for anonymous users to subscribe to newsletter
    - Create a new policy using the correct syntax with WITH CHECK instead of USING
    - Policy allows anonymous users to insert into newsletter_subscribers table
  
  Note: For INSERT policies, Supabase requires WITH CHECK instead of USING
*/

-- Drop the existing policy that isn't working correctly
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON newsletter_subscribers;

-- Create a new policy that explicitly allows anonymous users to insert records
-- Using WITH CHECK for INSERT policy (rather than USING which caused the error)
CREATE POLICY "Anyone can subscribe to newsletter" 
ON newsletter_subscribers
FOR INSERT 
TO anon
WITH CHECK (true);