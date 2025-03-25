import nlp from 'compromise';
import { format } from 'date-fns';

export interface ParsedResume {
  personalInfo: {
    name: string;
    email: string;
    phone?: string;
    location?: string;
  };
  skills: string[];
  experience: {
    years: number;
    companies: string[];
    roles: string[];
  };
  education: {
    degree: string;
    institution: string;
    year?: string;
  }[];
  softSkills: string[];
  cultureFitScore: number;
}

export class ResumeParser {
  private static SOFT_SKILLS = [
    'communication',
    'leadership',
    'teamwork',
    'problem solving',
    'adaptability',
    'creativity',
    'time management',
    'collaboration',
  ];

  static async parseResume(text: string): Promise<ParsedResume> {
    const doc = nlp(text);
    
    // Extract personal information
    const emails = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
    const phones = text.match(/(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g) || [];
    
    // Extract skills
    const techSkills = this.extractTechnicalSkills(text);
    
    // Extract experience
    const experience = this.extractExperience(text);
    
    // Extract education
    const education = this.extractEducation(doc);
    
    // Analyze soft skills and culture fit
    const softSkillsAnalysis = this.analyzeSoftSkills(text);
    
    return {
      personalInfo: {
        name: this.extractName(doc),
        email: emails[0] || '',
        phone: phones[0],
        location: this.extractLocation(text),
      },
      skills: techSkills,
      experience: {
        years: experience.years,
        companies: experience.companies,
        roles: experience.roles,
      },
      education,
      softSkills: softSkillsAnalysis.skills,
      cultureFitScore: softSkillsAnalysis.score,
    };
  }

  private static extractName(doc: any): string {
    const people = doc.people().out('array');
    return people[0] || '';
  }

  private static extractLocation(text: string): string | undefined {
    // Simple location extraction - could be enhanced
    const locationMatch = text.match(/(?:in|from|at)\s+([A-Z][A-Za-z\s,]+)(?=[\.,]|\s+(?:area|region))/);
    return locationMatch ? locationMatch[1].trim() : undefined;
  }

  private static extractTechnicalSkills(text: string): string[] {
    const commonTechSkills = [
      'javascript', 'typescript', 'python', 'java', 'react', 'angular', 'vue',
      'node.js', 'express', 'mongodb', 'sql', 'aws', 'docker', 'kubernetes',
      'ci/cd', 'git', 'agile', 'scrum'
    ];

    return commonTechSkills.filter(skill => 
      new RegExp(`\\b${skill}\\b`, 'i').test(text)
    );
  }

  private static extractExperience(text: string): {
    years: number;
    companies: string[];
    roles: string[];
  } {
    const yearsExp = text.match(/(\d+)[\s-]*years? of experience/i);
    const companies = text.match(/(?:at|with)\s+([A-Z][A-Za-z\s&]+)(?=[\.,]|\s+(?:from|as|in))/g) || [];
    const roles = text.match(/(?:Senior|Lead|Principal|Software|Developer|Engineer|Architect|Manager)[A-Za-z\s]+/g) || [];

    return {
      years: yearsExp ? parseInt(yearsExp[1]) : 0,
      companies: companies.map(c => c.replace(/^(?:at|with)\s+/, '')),
      roles: [...new Set(roles)],
    };
  }

  private static extractEducation(doc: any): {
    degree: string;
    institution: string;
    year?: string;
  }[] {
    const degrees = [
      "Bachelor's", "Master's", "PhD", "BSc", "MSc", "MBA",
      "Bachelor of", "Master of", "Doctor of"
    ];

    const education = [];
    const sentences = doc.sentences().out('array');

    for (const sentence of sentences) {
      if (degrees.some(degree => sentence.includes(degree))) {
        const degree = degrees.find(d => sentence.includes(d)) || '';
        const institution = sentence.match(/(?:from|at)\s+([A-Z][A-Za-z\s&]+)/)?.[1] || '';
        const year = sentence.match(/\b(19|20)\d{2}\b/)?.[0];

        education.push({
          degree,
          institution,
          year,
        });
      }
    }

    return education;
  }

  private static analyzeSoftSkills(text: string): {
    skills: string[];
    score: number;
  } {
    const foundSoftSkills = this.SOFT_SKILLS.filter(skill => 
      new RegExp(`\\b${skill}\\b`, 'i').test(text)
    );

    // Calculate culture fit score based on soft skills presence and context
    const score = Math.min(
      100,
      Math.round((foundSoftSkills.length / this.SOFT_SKILLS.length) * 100) +
      this.analyzeContextualFit(text)
    );

    return {
      skills: foundSoftSkills,
      score,
    };
  }

  private static analyzeContextualFit(text: string): number {
    let contextScore = 0;
    
    // Analyze for team-oriented language
    if (/\b(?:team|collaborate|together|we|group)\b/gi.test(text)) {
      contextScore += 10;
    }
    
    // Look for growth mindset indicators
    if (/\b(?:learn|grow|improve|develop|challenge)\b/gi.test(text)) {
      contextScore += 10;
    }
    
    // Check for leadership and initiative
    if (/\b(?:lead|initiate|organize|manage|coordinate)\b/gi.test(text)) {
      contextScore += 10;
    }
    
    return contextScore;
  }
}