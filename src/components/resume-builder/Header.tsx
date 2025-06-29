import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useResume } from '@/contexts/ResumeContext';
import { generatePDF, generateResumeFilename } from '@/utils/pdfGenerator';

export function Header() {
  const { state } = useResume();
  const [isDownloading, setIsDownloading] = useState(false);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const colors = {
      success: 'bg-green-600',
      error: 'bg-red-600',
      info: 'bg-blue-600'
    };
    
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.className = `fixed top-4 right-4 ${colors[type]} text-white px-4 py-2 rounded-lg shadow-lg z-50`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 3000);
  };

  const handleDownloadPDF = async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    
    try {
      const filename = generateResumeFilename(state.resumeData.personalInfo.fullName);
      await generatePDF('resume-preview', {
        filename,
        quality: 1,
        format: 'a4',
        margin: 10
      });
    } catch (error) {
      console.error('PDF generation failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900">TalentScript</h1>
            <span className="text-sm text-gray-500">Professional Resume Builder</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="default" 
              size="sm" 
              onClick={handleDownloadPDF}
              disabled={isDownloading}
            >
              <Download className="w-4 h-4 mr-2" />
              {isDownloading ? 'Generating...' : 'Download PDF'}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}