/*
  # Initial Schema Setup for AI Recruitment Assistant

  1. New Tables
    - `candidates`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `skills` (text[])
      - `experience_years` (integer)
      - `score` (integer)
      - `status` (text)
      - `created_at` (timestamp)
      - `user_id` (uuid, foreign key)

    - `job_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `department` (text)
      - `location` (text)
      - `type` (text)
      - `salary_range` (text)
      - `description` (text)
      - `requirements` (text)
      - `created_at` (timestamp)
      - `deadline` (timestamp)
      - `user_id` (uuid, foreign key)

    - `interviews`
      - `id` (uuid, primary key)
      - `candidate_id` (uuid, foreign key)
      - `job_post_id` (uuid, foreign key)
      - `date` (timestamp)
      - `type` (text)
      - `status` (text)
      - `notes` (text)
      - `created_at` (timestamp)
      - `user_id` (uuid, foreign key)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create candidates table
CREATE TABLE candidates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  skills text[] DEFAULT '{}',
  experience_years integer DEFAULT 0,
  score integer DEFAULT 0,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL
);

ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own candidates"
  ON candidates
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create job_posts table
CREATE TABLE job_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department text NOT NULL,
  location text NOT NULL,
  type text NOT NULL,
  salary_range text,
  description text,
  requirements text,
  created_at timestamptz DEFAULT now(),
  deadline timestamptz,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL
);

ALTER TABLE job_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own job posts"
  ON job_posts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create interviews table
CREATE TABLE interviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id uuid REFERENCES candidates(id) ON DELETE CASCADE NOT NULL,
  job_post_id uuid REFERENCES job_posts(id) ON DELETE CASCADE NOT NULL,
  date timestamptz NOT NULL,
  type text NOT NULL,
  status text DEFAULT 'scheduled',
  notes text,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL
);

ALTER TABLE interviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own interviews"
  ON interviews
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);