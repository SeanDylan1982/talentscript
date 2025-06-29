import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Download, Save, AlertTriangle, CheckCircle } from 'lucide-react';
import { useResume } from '@/contexts/ResumeContext';
import { generatePDF, generateResumeFilename } from '@/utils/pdfGenerator';

export function Header() {
  const { state, dispatch } = useResume();
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPrivacyWarning, setShowPrivacyWarning] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSaveClick = () => {
    setShowPrivacyWarning(true);
  };

  const handleAcceptPrivacyWarning = async () => {
    setShowPrivacyWarning(false);
    setIsSaving(true);

    try {
      // Save to local storage
      const dataToSave = {
        resumeData: state.resumeData,
        savedAt: new Date().toISOString(),
        version: '1.0'
      };

      localStorage.setItem('talentscript_resume_data', JSON.stringify(dataToSave));
      
      // Mark as saved in context
      dispatch({ type: 'MARK_SAVED' });
      
      // Show success modal
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Failed to save data:', error);
      showToast('Failed to save data. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelPrivacyWarning = () => {
    setShowPrivacyWarning(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">TalentScript</h1>
              <span className="text-sm text-gray-500">Professional Resume Builder</span>
              {state.hasUnsavedChanges && (
                <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                  Unsaved changes
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSaveClick}
                disabled={isSaving}
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
              
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

      {/* Privacy Warning Modal */}
      <Dialog open={showPrivacyWarning} onOpenChange={setShowPrivacyWarning}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>Privacy Notice</span>
            </DialogTitle>
            <DialogDescription className="text-left space-y-3 pt-2">
              <p className="font-medium text-gray-900">
                Important: Data Storage Warning
              </p>
              <p>
                Your resume data will be saved locally on this device only. 
                <strong className="text-red-600"> Do not save personal information on shared or public computers.</strong>
              </p>
              <p className="text-sm text-gray-600">
                This includes computers in libraries, internet cafes, coworking spaces, 
                or any device that others may have access to.
              </p>
              <p className="text-sm">
                By proceeding, you confirm that you understand this warning and 
                that this is your personal device.
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={handleCancelPrivacyWarning}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAcceptPrivacyWarning}
              disabled={isSaving}
              className="flex-1"
            >
              I Understand & Accept
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Data Saved Successfully</span>
            </DialogTitle>
            <DialogDescription className="text-left space-y-3 pt-2">
              <p>
                Your resume data has been successfully saved to your local device.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-800">
                  <strong>What this means:</strong>
                </p>
                <ul className="text-sm text-green-700 mt-1 space-y-1">
                  <li>• Your data is stored locally on this device only</li>
                  <li>• No information is sent to external servers</li>
                  <li>• Your data will be available when you return to this site</li>
                  <li>• Clearing browser data will remove your saved resume</li>
                </ul>
              </div>
              <p className="text-sm text-gray-600">
                You can continue editing your resume, and your changes will be automatically saved.
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleCloseSuccessModal} className="w-full">
              Continue Editing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}