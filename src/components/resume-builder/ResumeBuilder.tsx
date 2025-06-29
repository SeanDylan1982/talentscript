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
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Left Side - Form Section */}
          <div className="w-1/2 bg-white border-r border-gray-200 overflow-hidden">
            <div className="h-full overflow-y-auto">
              <ResumeForm />
            </div>
          </div>
          
          {/* Right Side - Preview Section */}
          <div className="w-1/2 bg-gray-100 overflow-hidden">
            <div className="h-full overflow-y-auto">
              <ResumePreview />
            </div>
          </div>
        </div>
      </div>
    </ResumeProvider>
  );
}