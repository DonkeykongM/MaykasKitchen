/*
# Create Recipe Rating and Comment System Tables

1. New Tables
   - `recipe_ratings`
     - `id` (uuid, primary key)
     - `recipe_id` (text, recipe identifier)
     - `user_name` (text, user display name)  
     - `user_email` (text, optional email)
     - `rating` (integer, 1-5 stars)
     - `created_at` (timestamp)
   - `recipe_comments`
     - `id` (uuid, primary key)
     - `recipe_id` (text, recipe identifier)
     - `user_name` (text, user display name)
     - `user_email` (text, optional email)
     - `comment_text` (text, comment content)
     - `rating` (integer, optional 1-5 stars)
     - `created_at` (timestamp)
     - `is_approved` (boolean, moderation flag)

2. Security
   - Enable RLS on both tables
   - Allow public read access to approved content
   - Allow anonymous users to insert new ratings/comments
   - Allow authenticated users to manage all content

3. Indexes
   - Optimized queries by recipe_id
   - Ordered by creation date
*/

-- Create recipe_ratings table
CREATE TABLE IF NOT EXISTS public.recipe_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id text NOT NULL,
  user_name text NOT NULL,
  user_email text,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now()
);

-- Create recipe_comments table  
CREATE TABLE IF NOT EXISTS public.recipe_comments (
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
CREATE INDEX IF NOT EXISTS idx_recipe_ratings_recipe_id ON public.recipe_ratings(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_ratings_created_at ON public.recipe_ratings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_recipe_comments_recipe_id ON public.recipe_comments(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_comments_created_at ON public.recipe_comments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_recipe_comments_approved ON public.recipe_comments(is_approved);

-- Enable Row Level Security
ALTER TABLE public.recipe_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipe_comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for recipe_ratings
CREATE POLICY "Anyone can view recipe ratings"
  ON public.recipe_ratings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anonymous users can insert ratings"
  ON public.recipe_ratings
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage all ratings"
  ON public.recipe_ratings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for recipe_comments  
CREATE POLICY "Anyone can view approved comments"
  ON public.recipe_comments
  FOR SELECT
  TO public
  USING (is_approved = true);

CREATE POLICY "Anonymous users can insert comments"
  ON public.recipe_comments
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage all comments"
  ON public.recipe_comments
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);