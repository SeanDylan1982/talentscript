import { lazy, LazyExoticComponent } from 'react';
import { TemplateMeta, TemplateCategory } from './types';
import { TemplateProps } from './templates/types';

// Define the type for our template components
type TemplateComponent = (props: TemplateProps) => JSX.Element;
type LazyTemplate = LazyExoticComponent<TemplateComponent>;

// Helper function to create lazy-loaded template components with proper typing
const createLazyTemplate = <T extends { [key: string]: TemplateComponent }>(
  importFn: () => Promise<T>,
  exportName: keyof T & string
): LazyTemplate => {
  return lazy(async () => {
    const module = await importFn();
    return { default: module[exportName] };
  });
};

// Lazy load all templates with proper typing
const templates = {
  AcademicTemplate: createLazyTemplate(
    () => import('./templates/AcademicTemplate'),
    'AcademicTemplate'
  ),
  BoldTemplate: createLazyTemplate(
    () => import('./templates/BoldTemplate'),
    'BoldTemplate'
  ),
  CleanMinimalistTemplate: createLazyTemplate(
    () => import('./templates/CleanMinimalistTemplate'),
    'CleanMinimalistTemplate'
  ),
  CleanProfessionalTemplate: createLazyTemplate(
    () => import('./templates/CleanProfessionalTemplate'),
    'CleanProfessionalTemplate'
  ),
  CorporateTemplate: createLazyTemplate(
    () => import('./templates/CorporateTemplate'),
    'CorporateTemplate'
  ),
  CreativeColorBlocksTemplate: createLazyTemplate(
    () => import('./templates/CreativeColorBlocksTemplate'),
    'CreativeColorBlocksTemplate'
  ),
  CreativeTemplate: createLazyTemplate(
    () => import('./templates/CreativeTemplate'),
    'CreativeTemplate'
  ),
  ElegantTemplate: createLazyTemplate(
    () => import('./templates/ElegantTemplate'),
    'ElegantTemplate'
  ),
  ExecutiveTemplate: createLazyTemplate(
    () => import('./templates/ExecutiveTemplate'),
    'ExecutiveTemplate'
  ),
  // MinimalTemplate: createLazyTemplate(
  //   () => import('./templates/MinimalTemplate'),
  //   'MinimalTemplate'
  // ),
  MinimalistATS: createLazyTemplate(
    () => import('./templates/MinimalistATS'),
    'MinimalistATS'
  ),
  MinimalistProfessionalTemplate: createLazyTemplate(
    () => import('./templates/MinimalistProfessionalTemplate'),
    'MinimalistProfessionalTemplate'
  ),
  MinimalistSidebarTemplate: createLazyTemplate(
    () => import('./templates/MinimalistSidebarTemplate'),
    'MinimalistSidebarTemplate'
  ),
  MinimalistTemplate: createLazyTemplate(
    () => import('./templates/MinimalistTemplate'),
    'MinimalistTemplate'
  ),
  ModernDarkSidebarTemplate: createLazyTemplate(
    () => import('./templates/ModernDarkSidebarTemplate'),
    'ModernDarkSidebarTemplate'
  ),
  ModernExecutiveTemplate: createLazyTemplate(
    () => import('./templates/ModernExecutiveTemplate'),
    'ModernExecutiveTemplate'
  ),
  ModernProfessionalTemplate: createLazyTemplate(
    () => import('./templates/ModernProfessionalTemplate'),
    'ModernProfessionalTemplate'
  ),
  ModernSidebarTemplate: createLazyTemplate(
    () => import('./templates/ModernSidebarTemplate'),
    'ModernSidebarTemplate'
  ),
  ModernTemplate: createLazyTemplate(
    () => import('./templates/ModernTemplate'),
    'ModernTemplate'
  ),
  ModernTimelineTemplate: createLazyTemplate(
    () => import('./templates/ModernTimelineTemplate'),
    'ModernTimelineTemplate'
  ),
  ModernTwoColumn: createLazyTemplate(
    () => import('./templates/ModernTwoColumn'),
    'ModernTwoColumn'
  ),
  ProfessionalBlueTemplate: createLazyTemplate(
    () => import('./templates/ProfessionalBlueTemplate'),
    'ProfessionalBlueTemplate'
  ),
  ProfessionalSidebarTemplate: createLazyTemplate(
    () => import('./templates/ProfessionalSidebarTemplate'),
    'ProfessionalSidebarTemplate'
  ),
  ProfessionalSummaryTemplate: createLazyTemplate(
    () => import('./templates/ProfessionalSummaryTemplate'),
    'ProfessionalSummaryTemplate'
  ),
  ProfessionalTemplate: createLazyTemplate(
    () => import('./templates/ProfessionalTemplate'),
    'ProfessionalTemplate'
  ),
  TechTemplate: createLazyTemplate(
    () => import('./templates/TechTemplate'),
    'TechTemplate'
  ),
  TimelineTemplate: createLazyTemplate(
    () => import('./templates/TimelineTemplate'),
    'TimelineTemplate'
  ),
};

// Template metadata with descriptions and categories
export const templateRegistry: TemplateMeta[] = [
  {
    id: 'clean-professional',
    name: 'Clean Professional',
    description: 'A clean and professional resume template with a balanced layout.',
    category: TemplateCategory.PROFESSIONAL,
    component: templates.CleanProfessionalTemplate,
    tags: ['professional', 'clean', 'ats-friendly'],
    atsFriendly: true,
    lastUpdated: '2025-07-23',
  },
  {
    id: 'modern-executive',
    name: 'Modern Executive',
    description: 'A modern executive resume with a sidebar for key information.',
    category: TemplateCategory.MODERN,
    component: templates.ModernExecutiveTemplate,
    tags: ['modern', 'executive', 'sidebar'],
    atsFriendly: true,
    lastUpdated: '2025-07-23',
  },
  {
    id: 'minimalist-ats',
    name: 'Minimalist ATS',
    description: 'Optimized for Applicant Tracking Systems with clean typography and structure.',
    category: TemplateCategory.MINIMALIST,
    component: templates.MinimalistATS,
    tags: ['minimalist', 'ats-optimized', 'clean'],
    atsFriendly: true,
    lastUpdated: '2025-07-23',
  },
  {
    id: 'creative-color-blocks',
    name: 'Creative Color Blocks',
    description: 'A creative template with color blocks for a modern, eye-catching design.',
    category: TemplateCategory.CREATIVE,
    component: templates.CreativeColorBlocksTemplate,
    tags: ['creative', 'colorful', 'modern'],
    atsFriendly: false,
    lastUpdated: '2025-07-23',
  },
  // Add more templates with their metadata
  {
    id: 'academic',
    name: 'Academic',
    description: 'Designed for academic and research positions with emphasis on publications.',
    category: TemplateCategory.SPECIALIZED,
    component: templates.AcademicTemplate,
    tags: ['academic', 'research', 'publications'],
    atsFriendly: true,
    lastUpdated: '2025-07-23',
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'A bold and confident design that makes a strong impression.',
    category: TemplateCategory.CREATIVE,
    component: templates.BoldTemplate,
    tags: ['bold', 'modern', 'creative'],
    atsFriendly: false,
    lastUpdated: '2025-07-23',
  },
  {
    id: 'clean-minimalist',
    name: 'Clean Minimalist',
    description: 'A minimalist design focused on content with plenty of white space.',
    category: TemplateCategory.MINIMALIST,
    component: templates.CleanMinimalistTemplate,
    tags: ['minimalist', 'clean', 'simple'],
    atsFriendly: true,
    lastUpdated: '2025-07-23',
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'A traditional corporate resume with a professional layout.',
    category: TemplateCategory.PROFESSIONAL,
    component: templates.CorporateTemplate,
    tags: ['corporate', 'professional', 'traditional'],
    atsFriendly: true,
    lastUpdated: '2025-07-23',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'A clean and minimalist resume template with a focus on readability.',
    category: TemplateCategory.MINIMALIST,
    component: templates.MinimalistTemplate,
    tags: ['minimalist', 'clean', 'simple'],
    atsFriendly: true,
    lastUpdated: '2025-07-23',
  },
  {
    id: 'modern-timeline',
    name: 'Modern Timeline',
    description: 'A modern design with a timeline layout for work experience.',
    category: TemplateCategory.MODERN,
    component: templates.ModernTimelineTemplate,
    tags: ['modern', 'timeline', 'creative'],
    atsFriendly: true,
    lastUpdated: '2025-07-23',
  },
  {
    id: 'professional-sidebar',
    name: 'Professional Sidebar',
    description: 'Professional layout with a sidebar for key information.',
    category: TemplateCategory.PROFESSIONAL,
    component: templates.ProfessionalSidebarTemplate,
    tags: ['professional', 'sidebar', 'modern'],
    atsFriendly: true,
    lastUpdated: '2025-07-23',
  },
];

// Helper functions
export const getTemplateById = (id: string) => {
  return templateRegistry.find(template => template.id === id);
};

export const getTemplatesByCategory = (category: TemplateCategory) => {
  return templateRegistry.filter(template => template.category === category);
};

export const getTemplatesByTag = (tag: string) => {
  return templateRegistry.filter(template => 
    template.tags?.includes(tag.toLowerCase())
  );
};

export const getATSFriendlyTemplates = () => {
  return templateRegistry.filter(template => template.atsFriendly);
};

// Get the lazy-loaded component for a template by ID
export const getTemplateComponent = (templateId: string) => {
  // Normalize the template ID to match the registry format (kebab-case to PascalCase)
  const normalizedId = templateId
    .toLowerCase()
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('') + 'Template';
  
  // Try to find the exact match first
  if (normalizedId in templates) {
    return templates[normalizedId as keyof typeof templates];
  }
  
  // Fallback to case-insensitive search
  const componentKey = Object.keys(templates).find(
    key => key.toLowerCase() === normalizedId.toLowerCase()
  );
  
  if (componentKey && componentKey in templates) {
    return templates[componentKey as keyof typeof templates];
  }
  
  // If still not found, log a warning and return MinimalistTemplate as fallback
  console.warn(`Template component for ID "${templateId}" not found, falling back to MinimalistTemplate`);
  return templates.MinimalistTemplate || templates.CleanProfessionalTemplate;
};

export default templateRegistry;
