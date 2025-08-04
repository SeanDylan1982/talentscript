import { ResumeData } from '@/types/resume';

export interface TemplateProps {
  data: ResumeData;
}

export interface TemplateSectionProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

export interface ExperienceItemProps {
  jobTitle: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  isCurrentJob: boolean;
  description: string[];
  className?: string;
}

export interface EducationItemProps {
  degree: string;
  school: string;
  location?: string;
  graduationDate: string;
  fieldOfStudy?: string;
  gpa?: string;
  className?: string;
}

export interface SkillItemProps {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  className?: string;
}

export interface CertificationItemProps {
  name: string;
  issuer: string;
  date: string;
  expirationDate?: string;
  className?: string;
}

export interface TemplateStyles {
  fontFamily?: string;
  primaryColor?: string;
  secondaryColor?: string;
  textColor?: string;
  backgroundColor?: string;
  spacing?: {
    section?: string;
    item?: string;
  };
}
