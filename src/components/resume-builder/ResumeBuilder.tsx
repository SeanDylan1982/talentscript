import React, { useEffect, useState } from 'react';
import { ResumeProvider } from '@/contexts/ResumeContext';
import { ResumeForm } from './ResumeForm';
import { ResumePreview } from './ResumePreview';
import { Header } from './Header';
import { TutorialModal } from '../tutorial/TutorialModal';
import { preloadAllFonts } from '@/utils/fontLoader';

export function ResumeBuilder() {
  const [showTutorial, setShowTutorial] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  // Preload fonts when the app starts
  useEffect(() => {
    preloadAllFonts().catch(console.warn);
  }, []);

  // Check if tutorial should be shown
  useEffect(() => {
    const tutorialCompleted = localStorage.getItem('talentscript_tutorial_completed');
    if (!tutorialCompleted) {
      // Small delay to ensure the app is fully loaded
      const timer = setTimeout(() => {
        setShowTutorial(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseTutorial = () => {
    setShowTutorial(false);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <ResumeProvider>
      <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
        <Header />
        <div className="flex flex-1 min-h-0">
          {/* Left Side - Form Section */}
          <div className="w-5/12 bg-white border-r border-gray-200 flex flex-col min-h-0 pb-[40px]">
            <div className="flex-1 overflow-y-auto">
              <ResumeForm activeTab={activeTab} onTabChange={handleTabChange} />
            </div>
          </div>

          {/* Right Side - Preview Section */}
          <div className="w-7/12 bg-gray-100 flex flex-col min-h-0 resume-preview pb-[40px]">
            <div className="flex-1 overflow-y-auto">
              <ResumePreview />
            </div>
          </div>
        </div>
      </div>

      {/* Tutorial Modal */}
      <TutorialModal
        isOpen={showTutorial}
        onClose={handleCloseTutorial}
        onTabChange={handleTabChange}
      />
    </ResumeProvider>
  );
}