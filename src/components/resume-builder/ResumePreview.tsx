import React, { useEffect } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { loadGoogleFont } from '@/utils/fontLoader';

export function ResumePreview() {
  const { state } = useResume();
  const { resumeData } = state;

  // Ensure the current font is loaded whenever it changes
  useEffect(() => {
    if (resumeData.customization.fontFamily) {
      loadGoogleFont(resumeData.customization.fontFamily).catch(console.warn);
    }
  }, [resumeData.customization.fontFamily]);

  const renderTemplate = () => {
    const templateProps = { data: resumeData };
    
    switch (resumeData.template) {
      case 'minimal':
        return <MinimalTemplate {...templateProps} />;
      case 'modern':
        return <ModernTemplate {...templateProps} />;
      case 'creative':
        return <CreativeTemplate {...templateProps} />;
      default:
        return <MinimalTemplate {...templateProps} />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-white">
        <h3 className="text-sm font-medium text-gray-900">Resume Preview</h3>
        <p className="text-xs text-gray-500">
          Template: {resumeData.template.charAt(0).toUpperCase() + resumeData.template.slice(1)} • 
          Font: {resumeData.customization.fontFamily}
        </p>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-[8.5in] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div 
            id="resume-preview" 
            className="bg-white"
            style={{ 
              fontFamily: resumeData.customization.fontFamily,
              // Force font loading by setting it on the container
              fontDisplay: 'swap'
            }}
          >
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
}