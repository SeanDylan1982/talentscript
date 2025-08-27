import { useEffect, useState, useMemo } from 'react';
import { getTemplateById } from './templateRegistry';
import { TemplateCategory, TemplateMeta } from './types';
import { TemplateProps } from './templates/types';
import { AlertCircle, FileQuestion, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define a type for the template component
type TemplateComponent = React.LazyExoticComponent<React.ComponentType<TemplateProps>>;

type TemplateLayout = 'one-column' | 'two-column' | 'sidebar' | 'creative';

// Define the base SVG function with proper escaping
const baseSvg = (content: string, colors: TemplateColors) => {
  const { background } = colors;
  try {
    return `
      <svg width="300" height="400" viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="400" fill="${background || '#ffffff'}" />
        ${content}
      </svg>
    `;
  } catch (error) {
    console.error('Error generating SVG:', error);
    return `
      <svg width="300" height="400" viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="400" fill="#ffffff" />
        <text x="20" y="30" font-family="Arial" font-size="12" fill="#ff0000">Preview Error</text>
      </svg>
    `;
  }
};

interface TemplatePreviewProps {
  templateId: string;
  className?: string;
  isSelected?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void;
}

// Use TemplateMeta directly since we don't need to modify it

interface TemplateColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  muted: string;
}

const getTemplateLayout = (templateId: string): TemplateLayout => {
  if (templateId.includes('sidebar')) return 'sidebar';
  if (templateId.includes('modern') || templateId.includes('creative')) return 'creative';
  if (templateId.includes('minimalist')) return 'one-column';
  return 'two-column';
};

const getCategoryColors = (category: TemplateCategory): TemplateColors => ({
  [TemplateCategory.PROFESSIONAL]: { 
    primary: '#1e40af', 
    secondary: '#93c5fd',
    background: '#ffffff',
    text: '#111827',
    muted: '#6b7280'
  },
  [TemplateCategory.MODERN]: { 
    primary: '#7c3aed', 
    secondary: '#c4b5fd',
    background: '#f9fafb',
    text: '#1f2937',
    muted: '#6b7280'
  },
  [TemplateCategory.MINIMALIST]: { 
    primary: '#059669', 
    secondary: '#6ee7b7',
    background: '#ffffff',
    text: '#1f2937',
    muted: '#6b7280'
  },
  [TemplateCategory.CREATIVE]: { 
    primary: '#c026d3', 
    secondary: '#f0abfc',
    background: '#fdf4ff',
    text: '#1f2937',
    muted: '#6b7280'
  },
  [TemplateCategory.SPECIALIZED]: { 
    primary: '#d97706', 
    secondary: '#fcd34d',
    background: '#fffbeb',
    text: '#1f2937',
    muted: '#6b7280'
  },
})[category] || {
  primary: '#1e40af', 
  secondary: '#93c5fd',
  background: '#ffffff',
  text: '#111827',
  muted: '#6b7280'
};

const generateSvgPreview = (layout: TemplateLayout, colors: TemplateColors): string => {
  if (!colors) {
    colors = {
      primary: '#1e40af',
      secondary: '#93c5fd',
      background: '#ffffff',
      text: '#111827',
      muted: '#6b7280'
    };
  }
  const { primary, secondary, text, muted } = colors;

  switch (layout) {
    case 'one-column':
      return baseSvg(`
        <rect x="20" y="20" width="260" height="40" rx="2" fill="${primary}" />
        <rect x="30" y="30" width="100" height="8" rx="1" fill="#ffffff" />
        
        {/* Contact Info */}
        <rect x="30" y="80" width="240" height="1" fill="#e5e7eb" />
        <rect x="30" y="90" width="60" height="5" rx="1" fill="${primary}" />
        <rect x="30" y="100" width="80" height="3" rx="1" fill="${muted}" />
        
        {/* Work Experience */}
        <rect x="30" y="130" width="100" height="5" rx="1" fill="${primary}" />
        <rect x="30" y="145" width="200" height="3" rx="1" fill="${text}" />
        <rect x="30" y="155" width="180" height="3" rx="1" fill="${muted}" />
        
        {/* Skills */}
        <rect x="30" y="185" width="60" height="5" rx="1" fill="${primary}" />
        <rect x="30" y="200" width="50" height="3" rx="1" fill="${muted}" />
        <rect x="90" y="200" width="50" height="3" rx="1" fill="${muted}" />
      `, colors);

    case 'sidebar':
      return baseSvg(`
        {/* Sidebar */}
        <rect x="20" y="20" width="90" height="360" rx="2" fill="${primary}" />
        <circle cx="55" cy="50" r="15" fill="#ffffff" />
        <rect x="20" y="80" width="90" height="10" rx="1" fill="${secondary}" opacity="0.5" />
        
        {/* Main Content */}
        <rect x="125" y="30" width="155" height="10" rx="1" fill="${primary}" />
        <rect x="125" y="50" width="120" height="5" rx="1" fill="${muted}" />
        
        {/* Experience */}
        <rect x="125" y="90" width="100" height="5" rx="1" fill="${primary}" />
        <rect x="125" y="105" width="150" height="3" rx="1" fill="${text}" />
      `, colors);

    case 'creative':
      return baseSvg(`
        {/* Decorative Elements */}
        <circle cx="50" cy="50" r="30" fill="${secondary}" opacity="0.3" />
        <circle cx="250" cy="80" r="20" fill="${secondary}" opacity="0.3" />
        
        {/* Header */}
        <rect x="30" y="30" width="180" height="10" rx="2" fill="${primary}" />
        <rect x="30" y="50" width="120" height="6" rx="1" fill="${muted}" />
        
        {/* Content Blocks */}
        <rect x="30" y="90" width="240" height="60" rx="2" fill="white" stroke="${primary}" stroke-width="1" />
        <rect x="30" y="165" width="240" height="60" rx="2" fill="white" stroke="${primary}" stroke-width="1" />
      `, colors);

    default: // two-column
      return baseSvg(`
        {/* Left Column */}
        <rect x="20" y="20" width="120" height="350" rx="2" fill="${primary}" opacity="0.9" />
        <circle cx="80" cy="50" r="20" fill="#ffffff" />
        
        {/* Right Column */}
        <rect x="155" y="20" width="125" height="10" rx="1" fill="${primary}" />
        <rect x="155" y="40" width="100" height="5" rx="1" fill="${muted}" />
        
        {/* Experience */}
        <rect x="155" y="70" width="80" height="5" rx="1" fill="${primary}" />
        <rect x="155" y="85" width="120" height="3" rx="1" fill="${text}" />
      `, colors);
  }
};

// Helper function to safely get template metadata
const useTemplate = (templateId: string): TemplateMeta | null => {
  return useMemo(() => {
    try {
      const t = getTemplateById(templateId);
      if (!t) {
        console.warn(`Template not found: ${templateId}, falling back to 'minimalist'`);
        return getTemplateById('minimalist');
      }
      return t;
    } catch (err) {
      console.error('Error loading template:', err);
      return null;
    }
  }, [templateId]);
};

export default function TemplatePreview({
  templateId,
  className = '',
  isSelected = false,
  onClick
}: TemplatePreviewProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get template metadata safely
  const template = useTemplate(templateId);

  // Load preview image or generate SVG preview
  useEffect(() => {
    // This variable will hold the URL if we create one in this effect run.
    let objectUrl: string | null = null;

    const loadPreview = async () => {
      if (!template) {
        setError('Template not found');
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);

      try {        
        if (template.previewImage) {
          // If template has a preview image, use it
          setPreviewImage(template.previewImage);
        } else {
          // Otherwise generate an SVG preview
          const layout = getTemplateLayout(template.id);
          const category = template.category || TemplateCategory.PROFESSIONAL;
          const colors = getCategoryColors(category);
          
          const svgContent = generateSvgPreview(layout, colors);
          if (!svgContent) {
            throw new Error('Failed to generate SVG content');
          }
          const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
          objectUrl = URL.createObjectURL(svgBlob);
          setPreviewImage(objectUrl);
        }
      } catch (err) {
        console.error('Error generating preview:', err);
        setError('Failed to generate preview');
        // Fallback to a simple SVG
        const fallbackSvg = `
          <svg width="300" height="400" viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="400" fill="#f3f4f6" />
            <rect x="20" y="20" width="260" height="40" rx="2" fill="#1e40af" />
            <rect x="30" y="30" width="100" height="8" rx="1" fill="#ffffff" />
          </svg>
        `;
        const svgBlob = new Blob([fallbackSvg], { type: 'image/svg+xml' });
        objectUrl = URL.createObjectURL(svgBlob);
        setPreviewImage(objectUrl);
      } finally {
        setIsLoading(false);
      }
    };

    loadPreview();

    // Clean up object URL to prevent memory leaks
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [template]);

  if (isLoading) {
    return (
      <div className={cn('relative rounded-lg bg-gray-100 overflow-hidden', className)}>
        <div className="aspect-[3/4] w-full animate-pulse bg-gray-200" />
        <div className="p-3">
          <div className="h-4 w-3/4 rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('relative rounded-lg border border-red-200 bg-red-50 p-4', className)}>
        <div className="flex items-center gap-2 text-red-600">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm font-medium">Failed to load preview</span>
        </div>
        <p className="mt-1 text-xs text-red-600">{error}</p>
      </div>
    );
  }

  if (!previewImage) {
    return (
      <div className={cn('relative rounded-lg border border-gray-200 bg-white p-4', className)}>
        <div className="flex flex-col items-center justify-center gap-2 py-8 text-gray-400">
          <FileQuestion className="h-8 w-8" />
          <p className="text-sm">No preview available</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        'group relative overflow-hidden rounded-lg border-2 transition-all',
        isSelected 
          ? 'border-blue-500 ring-2 ring-blue-200' 
          : 'border-gray-200 hover:border-blue-300 hover:shadow-md',
        className
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (onClick) {
            onClick(e);
          }
        }
      }}
    >
      <div className="aspect-[3/4] w-full overflow-hidden">
        <img
          src={previewImage}
          alt={`${template?.name} template preview`}
          className="h-full w-full object-cover"
          onError={() => {
            setError('Failed to load preview image');
            setPreviewImage(null);
          }}
        />
      </div>
      <div className="p-3">
        <h3 className="truncate text-sm font-medium text-gray-900">
          {template?.name || 'Untitled Template'}
        </h3>
        {template?.category && (
          <span className="mt-1 block text-xs text-gray-500">
            {template.category}
          </span>
        )}
      </div>
      {isSelected && (
        <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white">
          <Check className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}
