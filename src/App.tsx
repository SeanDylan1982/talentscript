import React, { Suspense, useState, useEffect } from 'react';
import { StackHandler, StackProvider, StackTheme, useStackApp } from "@stackframe/react";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ResumeBuilder } from '@/components/resume-builder/ResumeBuilder';
import { createStackClientApp } from './stack';
import './App.css';

function HandlerRoutes() {
  const location = useLocation();
  const stackApp = useStackApp();
  
  return (
    <StackHandler app={stackApp} location={location.pathname} fullPage />
  );
}

function StackAppInitializer({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [stackApp, setStackApp] = useState<ReturnType<typeof createStackClientApp> | null>(null);

  useEffect(() => {
    const app = createStackClientApp(navigate);
    setStackApp(app);
  }, [navigate]);

  if (!stackApp) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing TalentScript...</p>
        </div>
      </div>
    );
  }

  return (
    <StackProvider app={stackApp}>
      <StackTheme>
        {children}
      </StackTheme>
    </StackProvider>
  );
}

function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading TalentScript...</p>
      </div>
    </div>}>
      <BrowserRouter>
        <StackAppInitializer>
          <Routes>
            <Route path="/handler/*" element={<HandlerRoutes />} />
            <Route path="/*" element={<ResumeBuilder />} />
          </Routes>
        </StackAppInitializer>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;