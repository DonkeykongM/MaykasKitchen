/*
  # Fix newsletter subscribers RLS policy

  1. Changes
    - Update RLS policies for newsletter_subscribers table to allow anonymous inserts
    - Add policy to allow administrators to read all newsletter subscribers
    - Add policy to allow anonymous users to insert new subscriptions

  2. Security
    - Enable RLS on newsletter_subscribers table
    - Add policies for both authenticated and anonymous users
    - Restrict anonymous users to only insert operations
*/

-- First, ensure RLS is enabled
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Administrators can manage all newsletter subscribers" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Anonymous users can subscribe to newsletter" ON newsletter_subscribers;

-- Create policy for administrators (authenticated users) to manage all subscribers
CREATE POLICY "Administrators can manage all newsletter subscribers"
ON newsletter_subscribers
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Create policy for anonymous users to subscribe to newsletter
CREATE POLICY "Anonymous users can subscribe to newsletter"
ON newsletter_subscribers
FOR INSERT
TO anon
WITH CHECK (
  -- Basic validation that email is not null and follows email format
  email IS NOT NULL 
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);