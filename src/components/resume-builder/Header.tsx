import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Save, User, LogIn } from 'lucide-react';
import { useResume } from '@/contexts/ResumeContext';
import { useAuth } from '@/hooks/useAuth';
import { generatePDF, generateResumeFilename } from '@/utils/pdfGenerator';
import { AuthModal } from '@/components/auth/AuthModal';
import { ResumeService } from '@/services/resumeService';

export function Header() {
  const { state, dispatch } = useResume();
  const { user, login, register, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authDefaultTab, setAuthDefaultTab] = useState<'login' | 'signup'>('login');
  const [isDownloading, setIsDownloading] = useState(false);
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

  const handleSave = async () => {
    if (!user) {
      setAuthDefaultTab('login');
      setIsAuthModalOpen(true);
      return;
    }
    
    setIsSaving(true);
    try {
      await ResumeService.saveResume(user.id, state.resumeData);
      dispatch({ type: 'MARK_SAVED' });
      showToast('Resume saved successfully!');
    } catch (error) {
      console.error('Save failed:', error);
      showToast('Failed to save resume. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
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

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      showToast('Logged in successfully!');
      setIsAuthModalOpen(false);
    } catch (error) {
      throw error;
    }
  };

  const handleSignup = async (name: string, email: string, password: string) => {
    try {
      await register(name, email, password);
      showToast('Account created successfully!');
      setIsAuthModalOpen(false);
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      showToast('Logged out successfully!', 'info');
    } catch (error) {
      showToast('Error logging out', 'error');
    }
  };

  const openAuthModal = (tab: 'login' | 'signup') => {
    setAuthDefaultTab(tab);
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">TalentScript</h1>
              {state.hasUnsavedChanges && (
                <span className="text-sm text-amber-600 font-medium">
                  Unsaved changes
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              {user && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
              )}
              
              <Button 
                variant="default" 
                size="sm" 
                onClick={handleDownloadPDF}
                disabled={isDownloading}
              >
                <Download className="w-4 h-4 mr-2" />
                {isDownloading ? 'Generating...' : 'Download PDF'}
              </Button>
              
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={() => openAuthModal('login')}
                  className="flex items-center space-x-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
        defaultTab={authDefaultTab}
      />
    </>
  );
}