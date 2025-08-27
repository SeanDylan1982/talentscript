import { TemplateProps as TemplateComponentProps } from './templates/types';

export interface TemplateMeta {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  previewImage?: string;
  component: React.LazyExoticComponent<(props: TemplateComponentProps) => JSX.Element>;
  tags?: string[];
  atsFriendly: boolean;
  lastUpdated: string;
}

export enum TemplateCategory {
  PROFESSIONAL = 'Professional',
  MODERN = 'Modern',
  MINIMALIST = 'Minimalist',
  CREATIVE = 'Creative',
  SPECIALIZED = 'Specialized',
}
