import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight, User, FileText, Briefcase, Palette, Save, Download } from 'lucide-react';

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  targetElement: string;
  targetTab?: string;
  icon: React.ReactNode;
  position: 'left' | 'right' | 'center';
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: 'Add Your Personal Details',
    description: 'Start by filling in your personal information in the Personal tab. You can also add your details in the Content tab (education, skills, certifications) and Experience tab (work history).',
    targetElement: '[data-tutorial="personal-form"]',
    targetTab: 'personal',
    icon: <User className="w-5 h-5" />,
    position: 'right'
  },
  {
    id: 2,
    title: 'Customize Your Resume Style',
    description: 'Switch to the Style tab to choose your resume template, change fonts, select accent colors, and toggle profile image visibility.',
    targetElement: '[data-tutorial="style-form"]',
    targetTab: 'customize',
    icon: <Palette className="w-5 h-5" />,
    position: 'right'
  },
  {
    id: 3,
    title: 'Save Your Progress',
    description: 'Click the Save button to store your resume data locally on your device. Your progress will be preserved for future visits.',
    targetElement: '[data-tutorial="save-button"]',
    targetTab: 'personal',
    icon: <Save className="w-5 h-5" />,
    position: 'left'
  },
  {
    id: 4,
    title: 'Download Your Resume',
    description: 'When you\'re ready, click the PDF button to download your resume for printing or digital distribution.',
    targetElement: '[data-tutorial="download-button"]',
    targetTab: 'personal',
    icon: <Download className="w-5 h-5" />,
    position: 'left'
  }
];

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTabChange: (tab: string) => void;
}

export function TutorialModal({ isOpen, onClose, onTabChange }: TutorialModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null);

  const currentTutorialStep = tutorialSteps[currentStep];

  useEffect(() => {
    if (!isOpen) {
      removeHighlight();
      return;
    }

    // Change to the required tab if specified
    if (currentTutorialStep.targetTab) {
      onTabChange(currentTutorialStep.targetTab);
    }

    // Wait for tab change and then highlight element
    const timer = setTimeout(() => {
      highlightElement(currentTutorialStep.targetElement);
    }, 300);

    return () => {
      clearTimeout(timer);
      removeHighlight();
    };
  }, [currentStep, isOpen, currentTutorialStep, onTabChange]);

  const highlightElement = (selector: string) => {
    removeHighlight();
    
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      setHighlightedElement(element);
      element.style.position = 'relative';
      element.style.zIndex = '1000';
      element.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)';
      element.style.borderRadius = '8px';
      element.style.transition = 'all 0.3s ease';
      
      // Scroll element into view
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
      });
    }
  };

  const removeHighlight = () => {
    if (highlightedElement) {
      highlightedElement.style.boxShadow = '';
      highlightedElement.style.zIndex = '';
      highlightedElement.style.position = '';
      highlightedElement.style.borderRadius = '';
      setHighlightedElement(null);
    }
  };

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('talentscript_tutorial_completed', 'true');
    onClose();
  };

  const handleComplete = () => {
    localStorage.setItem('talentscript_tutorial_completed', 'true');
    onClose();
  };

  const getModalPosition = () => {
    switch (currentTutorialStep.position) {
      case 'left':
        return 'fixed left-4 top-1/2 transform -translate-y-1/2 w-80';
      case 'right':
        return 'fixed right-4 top-1/2 transform -translate-y-1/2 w-80';
      default:
        return 'fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96';
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[999]" />
      
      {/* Tutorial Modal */}
      <div className={`${getModalPosition()} z-[1001]`}>
        <div className="bg-white rounded-lg shadow-xl border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                {currentTutorialStep.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{currentTutorialStep.title}</h3>
                <p className="text-xs text-gray-500">
                  Step {currentStep + 1} of {tutorialSteps.length}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              {currentTutorialStep.description}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="px-4 pb-2">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-4 border-t border-gray-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-gray-500 hover:text-gray-700"
            >
              Skip Tutorial
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center space-x-1"
              >
                <ChevronLeft className="w-3 h-3" />
                <span>Previous</span>
              </Button>
              
              {currentStep === tutorialSteps.length - 1 ? (
                <Button
                  size="sm"
                  onClick={handleComplete}
                  className="flex items-center space-x-1"
                >
                  <span>Get Started</span>
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={handleNext}
                  className="flex items-center space-x-1"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}