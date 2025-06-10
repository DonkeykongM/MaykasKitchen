/*
  # Create tables for MaykasKitchen website

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `email` (text, not null)
      - `subject` (text)
      - `message` (text, not null)
      - `subscribe_to_newsletter` (boolean)
      - `created_at` (timestamptz, default now())
    - `newsletter_subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique, not null)
      - `name` (text)
      - `source` (text)
      - `subscribed_at` (timestamptz, default now())
      - `is_active` (boolean, default true)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for administrators to manage all data
*/

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  subscribe_to_newsletter boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  source text,
  subscribed_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies for administrators
-- For contact_submissions
CREATE POLICY "Administrators can manage all contact submissions"
  ON contact_submissions
  USING (auth.role() = 'authenticated');

-- For newsletter_subscribers
CREATE POLICY "Administrators can manage all newsletter subscribers"
  ON newsletter_subscribers
  USING (auth.role() = 'authenticated');

-- Anonymous users can insert new contact submissions
CREATE POLICY "Anonymous users can insert contact submissions"
  ON contact_submissions
  FOR INSERT
  WITH CHECK (true);

-- Anonymous users can subscribe to newsletter
CREATE POLICY "Anonymous users can subscribe to newsletter"
  ON newsletter_subscribers
  FOR INSERT
  WITH CHECK (true);