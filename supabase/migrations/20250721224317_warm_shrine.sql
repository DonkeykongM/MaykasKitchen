/*
  # Recipe Rating and Comment System

  1. New Tables
    - `recipe_ratings`
      - `id` (uuid, primary key)
      - `recipe_id` (text, not null)
      - `user_name` (text, not null)
      - `user_email` (text, optional)
      - `rating` (integer, 1-5)
      - `created_at` (timestamptz, default now())
    - `recipe_comments`
      - `id` (uuid, primary key)
      - `recipe_id` (text, not null)
      - `user_name` (text, not null)
      - `user_email` (text, optional)
      - `comment_text` (text, not null)
      - `rating` (integer, 1-5, optional)
      - `created_at` (timestamptz, default now())
      - `is_approved` (boolean, default true)

  2. Security
    - Enable RLS on both tables
    - Allow public read access
    - Allow anonymous users to insert ratings and comments
    - Allow authenticated users to manage all data
*/

-- Create recipe_ratings table
CREATE TABLE IF NOT EXISTS recipe_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id text NOT NULL,
  user_name text NOT NULL,
  user_email text,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now()
);

-- Create recipe_comments table
CREATE TABLE IF NOT EXISTS recipe_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id text NOT NULL,
  user_name text NOT NULL,
  user_email text,
  comment_text text NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now(),
  is_approved boolean DEFAULT true
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_recipe_ratings_recipe_id ON recipe_ratings(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_comments_recipe_id ON recipe_comments(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_comments_created_at ON recipe_comments(created_at DESC);

-- Enable Row Level Security
ALTER TABLE recipe_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_comments ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can read recipe ratings"
  ON recipe_ratings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can read approved recipe comments"
  ON recipe_comments
  FOR SELECT
  TO public
  USING (is_approved = true);

-- Create policies for anonymous users to insert
CREATE POLICY "Anyone can submit recipe ratings"
  ON recipe_ratings
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can submit recipe comments"
  ON recipe_comments
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policies for authenticated users to manage all data
CREATE POLICY "Authenticated users can manage all recipe ratings"
  ON recipe_ratings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage all recipe comments"
  ON recipe_comments
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);