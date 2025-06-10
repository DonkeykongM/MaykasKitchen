/*
  # Fix newsletter subscribers RLS policies

  1. Changes
    - Drops existing RLS policies for the newsletter_subscribers table
    - Re-enables RLS on the newsletter_subscribers table
    - Creates new policies that properly allow anonymous users to insert data
    - Creates policy for authenticated users to manage all newsletter subscribers

  2. Security
    - Maintains RLS protection while properly allowing anonymous newsletter subscriptions
    - Ensures authenticated users can manage all subscribers
*/

-- Drop existing policies to reset them
DROP POLICY IF EXISTS "Administrators can manage all newsletter subscribers" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Anonymous users can subscribe to newsletter" ON newsletter_subscribers;

-- Make sure RLS is enabled on the table
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy for administrators (authenticated users)
CREATE POLICY "Administrators can manage all newsletter subscribers"
ON newsletter_subscribers
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Create policy for anonymous users to insert data
CREATE POLICY "Anonymous users can subscribe to newsletter"
ON newsletter_subscribers
FOR INSERT
TO anon
WITH CHECK (true);