import { Industry, IndustrySettings } from '../types/industry';

export const defaultIndustrySettings: Record<Industry, IndustrySettings> = {
  technology: {
    industry: 'technology',
    compliance: [],
    requiredFields: ['technical_skills', 'experience', 'education'],
    customTemplates: ['technical_interview', 'coding_assessment'],
    aiModel: 'tech_specialist',
    keywords: ['software', 'development', 'engineering', 'cloud', 'AI'],
    certifications: ['AWS', 'Azure', 'Google Cloud', 'CISSP']
  },
  healthcare: {
    industry: 'healthcare',
    compliance: [
      {
        id: 'hipaa',
        name: 'HIPAA Compliance',
        description: 'Health Insurance Portability and Accountability Act',
        required: true,
        region: ['US']
      }
    ],
    requiredFields: ['licenses', 'certifications', 'experience'],
    customTemplates: ['clinical_interview', 'credential_verification'],
    aiModel: 'healthcare_specialist',
    keywords: ['medical', 'healthcare', 'clinical', 'patient care'],
    certifications: ['RN', 'MD', 'LPN', 'CMA']
  },
  finance: {
    industry: 'finance',
    compliance: [
      {
        id: 'finra',
        name: 'FINRA Requirements',
        description: 'Financial Industry Regulatory Authority',
        required: true,
        region: ['US']
      }
    ],
    requiredFields: ['licenses', 'experience', 'background_check'],
    customTemplates: ['financial_interview', 'compliance_check'],
    aiModel: 'finance_specialist',
    keywords: ['finance', 'banking', 'investment', 'accounting'],
    certifications: ['CFA', 'CPA', 'Series 7', 'Series 63']
  },
  education: {
    industry: 'education',
    compliance: [
      {
        id: 'ferpa',
        name: 'FERPA Compliance',
        description: 'Family Educational Rights and Privacy Act',
        required: true,
        region: ['US']
      }
    ],
    requiredFields: ['education', 'teaching_experience', 'certifications'],
    customTemplates: ['teaching_demo', 'student_interaction'],
    aiModel: 'education_specialist',
    keywords: ['teaching', 'education', 'academic', 'curriculum'],
    certifications: ['Teaching License', 'TESOL', 'CELTA']
  },
  retail: {
    industry: 'retail',
    compliance: [],
    requiredFields: ['customer_service', 'experience', 'availability'],
    customTemplates: ['customer_service_assessment', 'retail_interview'],
    aiModel: 'retail_specialist',
    keywords: ['retail', 'sales', 'customer service', 'merchandising'],
    certifications: []
  },
  manufacturing: {
    industry: 'manufacturing',
    compliance: [
      {
        id: 'osha',
        name: 'OSHA Requirements',
        description: 'Occupational Safety and Health Administration',
        required: true,
        region: ['US']
      }
    ],
    requiredFields: ['safety_training', 'experience', 'physical_requirements'],
    customTemplates: ['safety_assessment', 'technical_interview'],
    aiModel: 'manufacturing_specialist',
    keywords: ['manufacturing', 'production', 'operations', 'quality'],
    certifications: ['OSHA', 'Six Sigma', 'Lean Manufacturing']
  },
  legal: {
    industry: 'legal',
    compliance: [
      {
        id: 'bar',
        name: 'Bar Requirements',
        description: 'State Bar Association Requirements',
        required: true,
        region: ['US']
      }
    ],
    requiredFields: ['bar_status', 'experience', 'specialization'],
    customTemplates: ['legal_interview', 'case_study'],
    aiModel: 'legal_specialist',
    keywords: ['legal', 'law', 'attorney', 'paralegal'],
    certifications: ['Bar License', 'Paralegal Certification']
  },
  other: {
    industry: 'other',
    compliance: [],
    requiredFields: ['experience', 'skills'],
    customTemplates: ['general_interview'],
    aiModel: 'general',
    keywords: [],
    certifications: []
  }
}; 