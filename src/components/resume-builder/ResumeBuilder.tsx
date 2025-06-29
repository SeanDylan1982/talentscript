import React, { useEffect } from 'react';
import { ResumeProvider } from '@/contexts/ResumeContext';
import { ResumeForm } from './ResumeForm';
import { ResumePreview } from './ResumePreview';
import { Header } from './Header';
import { preloadAllFonts } from '@/utils/fontLoader';

export function ResumeBuilder() {
  // Preload fonts when the app starts
  useEffect(() => {
    preloadAllFonts().catch(console.warn);
  }, []);

  return (
    <ResumeProvider>
      <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
        <Header />
        <div className="flex flex-1 min-h-0">
          {/* Left Side - Form Section */}
          <div className="w-1/2 bg-white border-r border-gray-200 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto">
              <ResumeForm />
            </div>
          </div>
          
          {/* Right Side - Preview Section */}
          <div className="w-1/2 bg-gray-100 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto">
              <ResumePreview />
            </div>
          </div>
        </div>
      </div>
    </ResumeProvider>
  );
}