export interface Profile {
  id: number;
  name: string;
  job_title: string;
  bio: string;
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
  name: string;
  icon: string | null;
  icon_url: string;
  proficiency: number;
}

export interface SkillCategory {
  id: number;
  name: string;
  category_type: 'hard' | 'soft';
  skills: Skill[];
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  thumbnail: string | null;
  live_url: string;
  github_url: string;
  technologies: Skill[];
  featured: boolean;
  order: number;
  created_at: string;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  start_date: string;
  end_date: string | null;
  order: number;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string | null;
  description: string;
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
