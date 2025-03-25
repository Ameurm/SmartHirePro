export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      candidates: {
        Row: {
          id: string
          name: string
          email: string
          skills: string[]
          experience_years: number
          score: number
          status: string
          created_at: string
          user_id: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          skills?: string[]
          experience_years?: number
          score?: number
          status?: string
          created_at?: string
          user_id: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          skills?: string[]
          experience_years?: number
          score?: number
          status?: string
          created_at?: string
          user_id?: string
        }
      }
      job_posts: {
        Row: {
          id: string
          title: string
          department: string
          location: string
          type: string
          salary_range: string | null
          description: string | null
          requirements: string | null
          created_at: string
          deadline: string | null
          user_id: string
        }
        Insert: {
          id?: string
          title: string
          department: string
          location: string
          type: string
          salary_range?: string | null
          description?: string | null
          requirements?: string | null
          created_at?: string
          deadline?: string | null
          user_id: string
        }
        Update: {
          id?: string
          title?: string
          department?: string
          location?: string
          type?: string
          salary_range?: string | null
          description?: string | null
          requirements?: string | null
          created_at?: string
          deadline?: string | null
          user_id?: string
        }
      }
      interviews: {
        Row: {
          id: string
          candidate_id: string
          job_post_id: string
          date: string
          type: string
          status: string
          notes: string | null
          created_at: string
          user_id: string
        }
        Insert: {
          id?: string
          candidate_id: string
          job_post_id: string
          date: string
          type: string
          status?: string
          notes?: string | null
          created_at?: string
          user_id: string
        }
        Update: {
          id?: string
          candidate_id?: string
          job_post_id?: string
          date?: string
          type?: string
          status?: string
          notes?: string | null
          created_at?: string
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}