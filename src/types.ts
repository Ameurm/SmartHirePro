export interface Candidate {
  id: string;
  name: string;
  email: string;
  skills: string[];
  experience: number;
  score: number;
  status: 'new' | 'reviewing' | 'interviewed' | 'offered' | 'rejected';
  interviewDate?: string;
}

export interface ResumeAnalysis {
  skills: string[];
  yearsOfExperience: number;
  educationLevel: string;
  technicalScore: number;
  cultureFitScore: number;
}