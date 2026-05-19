export type Localized<T = string> = T | { en: T; 'pt-BR': T };

export interface Profile {
  id: number;
  name: string;
  job_title: Localized;
  bio: Localized;
  photo: string | null;
  phone: string;
  email: string;
  location: string;
  github_url: string;
  linkedin_url: string;
  resume_file: string | null;
}

export interface Skill {
  id: number;
  name: Localized;
  icon: string | null;
  icon_url: string;
  proficiency: number;
}

export interface SkillCategory {
  id: number;
  name: Localized;
  category_type: 'hard' | 'soft';
  skills: Skill[];
}

export interface Project {
  id: number;
  title: Localized;
  slug: string;
  description: Localized;
  short_description: Localized;
  thumbnail: string | null;
  thumbnail_url: string;
  live_url: string;
  github_url: string;
  technologies: Skill[];
  featured: boolean;
  order: number;
  created_at: string;
}

export interface Experience {
  id: number;
  title: Localized;
  company: string;
  location: string;
  description: Localized;
  start_date: string;
  end_date: string | null;
  order: number;
}

export interface Education {
  id: number;
  institution: string;
  degree: Localized;
  field_of_study: Localized;
  start_date: string;
  end_date: string | null;
  description: Localized;
  order: number;
}

export interface Language {
  id: number;
  name: string;
  level: 'native' | 'fluent' | 'advanced' | 'intermediate' | 'basic';
  order: number;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface PortfolioData {
  profile: Profile | null;
  skill_categories: SkillCategory[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  languages: Language[];
}
