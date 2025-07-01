import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Download, Save, AlertTriangle, CheckCircle, RotateCcw } from 'lucide-react';
import { useResume } from '@/contexts/ResumeContext';
import { generatePDF, generateResumeFilename } from '@/utils/pdfGenerator';
import initialResumeData from '@/contexts/ResumeData';


export function Header() {
  const { state, dispatch } = useResume();
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPrivacyWarning, setShowPrivacyWarning] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [user, setUser] = useState(null);

  const handleResetClick = () => {
    setShowResetConfirmation(true);
  };

  const handleConfirmReset = () => {
    const dataToSave = {
      resumeData: initialResumeData,
      savedAt: new Date().toISOString(),
      version: "1.0",
    };
    dispatch({ type: 'SET_RESUME_DATA', payload: initialResumeData });
    setShowResetConfirmation(false);    
    localStorage.setItem(
      "talentscript_resume_data",
      JSON.stringify(dataToSave)
    );
    showToast('Resume data has been reset to default', 'info');
  };

  const handleCancelReset = () => {
    setShowResetConfirmation(false);
  };

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
        margin: 12
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
        version: "1.0",
      };
      localStorage.setItem(
        "talentscript_resume_data",
        JSON.stringify(dataToSave)
      );

      // If user is logged in, save to backend
      if (user && user.token) {
        const res = await fetch("http://localhost:5000/api/resume/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ resumeData: state.resumeData }),
        });
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.message || "Failed to save to database");
      }

      // Mark as saved in context
      dispatch({ type: "MARK_SAVED" });
      // Show success modal
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Failed to save data:", error);
      showToast("Failed to save data. Please try again.", "error");
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

  const handleLogout = () => {
    setUser(null);
    showToast("Logged out successfully", "info");
  };

  return (
    <>
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {authTab === "login" ? "Login" : "Sign Up"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setAuthTab("login")}
              className={authTab === "login" ? "font-bold" : ""}
            >
              Login
            </button>
            <span className="mx-2">|</span>
            <button
              onClick={() => setAuthTab("signup")}
              className={authTab === "signup" ? "font-bold" : ""}
            >
              Sign Up
            </button>
          </div>
          <input
            type="email"
            placeholder="Email"
            value={authEmail}
            onChange={(e) => setAuthEmail(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={authPassword}
            onChange={(e) => setAuthPassword(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          />
          {authError && <div className="text-red-600 mb-2">{authError}</div>}
          <DialogFooter>
            <Button
              onClick={async () => {
                setAuthLoading(true);
                setAuthError("");
                try {
                  const endpoint =
                    authTab === "login"
                      ? "/api/auth/login"
                      : "/api/auth/register";
                  const res = await fetch(`http://localhost:5000${endpoint}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      email: authEmail,
                      password: authPassword,
                    }),
                  });
                  const data = await res.json();
                  if (!res.ok) throw new Error(data.message || "Auth failed");
                  if (authTab === "login") {
                    setUser({ email: authEmail, token: data.token });
                    setShowAuthModal(false);
                    showToast("Login successful!", "success");
                  } else {
                    setAuthTab("login");
                    setAuthError("Sign up successful! Please log in.");
                  }
                } catch (err: any) {
                  setAuthError(err.message);
                } finally {
                  setAuthLoading(false);
                }
              }}
              disabled={authLoading}
              className="w-full"
            >
              {authTab === "login" ? "Login" : "Sign Up"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 headerNav">
        <div className="px-4">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-3">
              <h1 className="text-lg font-bold text-gray-900">TalentScript</h1>
              <span className="text-base text-gray-500 hidden sm:inline">
                Professional Resume Builder
              </span>
              {state.hasUnsavedChanges && (
                <span className="text-base text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                  Unsaved
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="base"
                onClick={handleResetClick}
                className="h-6 px-2 text-xs"
                data-tutorial="reset-button"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Reset
              </Button>

              <Button
                variant="outline"
                size="base"
                onClick={handleSaveClick}
                disabled={isSaving}
                className="h-6 px-2 text-xs"
                data-tutorial="save-button"
              >
                <Save className="w-3 h-3 mr-1" />
                {isSaving ? "Saving..." : "Save"}
              </Button>

              <Button
                variant="default"
                size="base"
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="h-6 px-2 text-xs"
                data-tutorial="download-button"
              >
                <Download className="w-3 h-3 mr-1" />
                {isDownloading ? "Generating..." : "PDF"}
              </Button>
              <Button
                variant="outline"
                size="base"
                onClick={user ? handleLogout : () => setShowAuthModal(true)}
                className="h-6 px-2 text-xs"
                data-tutorial="auth-button"
              >
                {user ? `Logout (${user.email})` : "Sign Up / Login"}
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
              <span>Data Storage Notice</span>
            </DialogTitle>
            <DialogDescription className="text-left space-y-3 pt-2">
              {user ? (
                <>
                  <p className="font-medium text-gray-900">
                    Your resume data will be securely saved to your account in
                    our database (MongoDB Atlas).
                  </p>
                  <p className="text-sm text-gray-600">
                    This allows you to access your resume from any device after
                    logging in. Your data is not shared with third parties.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-medium text-gray-900">
                    Important: Data Storage Warning
                  </p>
                  <p>
                    Your resume data will be saved{" "}
                    <strong>locally on this device only</strong>.
                    <strong className="text-red-600">
                      {" "}
                      Do not save personal information on shared or public
                      computers.
                    </strong>
                  </p>
                  <p className="text-sm text-gray-600">
                    This includes computers in libraries, internet cafes,
                    coworking spaces, or any device that others may have access
                    to.
                  </p>
                  <p className="text-sm">
                    By proceeding, you confirm that you understand this warning
                    and that this is your personal device.
                  </p>
                </>
              )}
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
                Your resume data has been successfully saved to your local
                device.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-800">
                  <strong>What this means:</strong>
                </p>
                <ul className="text-sm text-green-700 mt-1 space-y-1">
                  <li>• Your data is stored locally on this device only</li>
                  <li>• No information is sent to external servers</li>
                  <li>
                    • Your data will be available when you return to this site
                  </li>
                  <li>• Clearing browser data will remove your saved resume</li>
                </ul>
              </div>
              <p className="text-sm text-gray-600">
                You can continue editing your resume, and your changes will be
                automatically saved.
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

      {/* Reset Confirmation Modal */}
      <Dialog
        open={showResetConfirmation}
        onOpenChange={setShowResetConfirmation}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>Reset Resume Data</span>
            </DialogTitle>
            <DialogDescription className="text-left space-y-3 pt-2">
              <p className="font-medium text-gray-900">
                Are you sure you want to reset your resume?
              </p>
              <p>
                This action will reset all form fields to their default values.
                This cannot be undone.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-sm text-amber-800">
                  Warning: All your current resume data will be lost.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleCancelReset}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmReset}
              className="flex-1"
            >
              Reset Data
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}