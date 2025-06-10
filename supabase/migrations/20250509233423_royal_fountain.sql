/*
  # Fix newsletter subscribers RLS policies - Final Solution

  1. Changes
    - First drops all existing policies for the newsletter_subscribers table
    - Disables and re-enables RLS to ensure a clean state
    - Creates a new policy specifically for public (including anonymous) users
      to insert newsletter subscriptions
    - Creates separate policy for authenticated users to have full access

  2. Security
    - Maintains proper security while allowing anonymous newsletter subscriptions
    - Ensures authenticated users can still manage all subscribers
*/

-- First drop all existing policies to start fresh
DROP POLICY IF EXISTS "Administrators can manage all newsletter subscribers" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Anonymous users can subscribe to newsletter" ON newsletter_subscribers;

-- Toggle RLS off and on to ensure clean state
ALTER TABLE newsletter_subscribers DISABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create a permissive policy for authenticated users (full access)
CREATE POLICY "Administrators can manage all newsletter subscribers"
ON newsletter_subscribers
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Create a permissive policy for anonymous users (insert only)
-- Use 'public' role which includes both authenticated and anonymous users
CREATE POLICY "Anyone can subscribe to newsletter"
ON newsletter_subscribers
FOR INSERT
TO public
WITH CHECK (true);