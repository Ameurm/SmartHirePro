import { supabase } from './supabase';
import type { Database } from '../types/database';

type Candidate = Database['public']['Tables']['candidates']['Row'];
type JobPost = Database['public']['Tables']['job_posts']['Row'];
type Interview = Database['public']['Tables']['interviews']['Row'];

// Candidates
export async function getCandidates() {
  const { data, error } = await supabase
    .from('candidates')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
}

export async function createCandidate(candidate: Omit<Candidate, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('candidates')
    .insert(candidate)
    .select()
    .single();
  return { data, error };
}

// Job Posts
export async function getJobPosts() {
  const { data, error } = await supabase
    .from('job_posts')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
}

export async function createJobPost(jobPost: Omit<JobPost, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('job_posts')
    .insert(jobPost)
    .select()
    .single();
  return { data, error };
}

// Interviews
export async function getInterviews() {
  const { data, error } = await supabase
    .from('interviews')
    .select(`
      *,
      candidates (
        name,
        email
      ),
      job_posts (
        title,
        department
      )
    `)
    .order('date', { ascending: true });
  return { data, error };
}

export async function createInterview(interview: Omit<Interview, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('interviews')
    .insert(interview)
    .select()
    .single();
  return { data, error };
}