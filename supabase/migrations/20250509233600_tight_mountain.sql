/*
  # Fix newsletter subscribers RLS policy

  1. Changes
    - Drops all existing RLS policies for the newsletter_subscribers table
    - Disables and re-enables RLS to ensure a clean state
    - Creates policies that allow both authenticated and anonymous users to insert data
    - Uses public role which includes both authenticated and anonymous users

  2. Security
    - Maintains RLS protection while properly allowing newsletter subscriptions
    - Ensures data integrity for the newsletter system
*/

-- First, drop all existing policies to start with a clean slate
DROP POLICY IF EXISTS "Administrators can manage all newsletter subscribers" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Anonymous users can subscribe to newsletter" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON newsletter_subscribers;

-- Disable and re-enable RLS to ensure clean state
ALTER TABLE newsletter_subscribers DISABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy for administrators (authenticated users) to manage all data
CREATE POLICY "Administrators can manage all newsletter subscribers"
ON newsletter_subscribers
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Create policy for ANYONE (public role includes both anon and authenticated)
-- This ensures all users can insert newsletter subscriptions
CREATE POLICY "Anyone can subscribe to newsletter"
ON newsletter_subscribers
FOR INSERT
TO public
WITH CHECK (true);