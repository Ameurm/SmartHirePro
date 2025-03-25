export type Industry = 
  | 'technology'
  | 'healthcare'
  | 'finance'
  | 'education'
  | 'retail'
  | 'manufacturing'
  | 'legal'
  | 'other';

export type ComplianceRequirement = {
  id: string;
  name: string;
  description: string;
  required: boolean;
  region: string[];
};

export type IndustrySettingsType = {
  industry: Industry;
  compliance: ComplianceRequirement[];
  requiredFields: string[];
  customTemplates: string[];
  aiModel: string;
  keywords: string[];
  certifications: string[];
};

export type Analytics = {
  timeToHire: number;
  candidateQuality: number;
  costPerHire: number;
  sourceEffectiveness: Record<string, number>;
  interviewSuccessRate: number;
  offerAcceptanceRate: number;
  retentionRate: number;
  diversityMetrics: {
    gender: Record<string, number>;
    ethnicity: Record<string, number>;
    age: Record<string, number>;
  };
};

export type Integration = {
  type: 'ats' | 'crm' | 'calendar' | 'email' | 'linkedin' | 'indeed';
  status: 'active' | 'pending' | 'failed';
  settings: Record<string, any>;
  lastSync: Date;
};

export type Client = {
  id: string;
  name: string;
  industry: Industry;
  subscription: {
    plan: 'starter' | 'professional' | 'enterprise';
    status: 'active' | 'pending' | 'cancelled';
    startDate: Date;
    endDate: Date;
  };
  customBranding: {
    logo: string;
    colors: string[];
    templates: string[];
    domain: string;
  };
  integrations: Integration[];
  analytics: Analytics;
  settings: IndustrySettingsType;
}; 