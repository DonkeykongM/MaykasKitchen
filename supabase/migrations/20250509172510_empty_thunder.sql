/*
  # Fix newsletter subscribers RLS policy

  1. Security Updates
    - Drop existing INSERT policy for anonymous users on newsletter_subscribers table
    - Create new, corrected INSERT policy for anonymous users
    - Policy allows any anonymous user to insert rows into the newsletter_subscribers table
  
  This migration resolves the row-level security violation errors when anonymous users
  attempt to subscribe to the newsletter.
*/

-- Drop the existing policy that isn't working correctly
DROP POLICY IF EXISTS "Anonymous users can subscribe to newsletter" ON newsletter_subscribers;

-- Create a new policy that explicitly allows anonymous users to insert data
CREATE POLICY "Anonymous users can subscribe to newsletter" 
  ON newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Also update the contact_submissions policy to use anon role specifically
DROP POLICY IF EXISTS "Anonymous users can insert contact submissions" ON contact_submissions;

CREATE POLICY "Anonymous users can insert contact submissions" 
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);