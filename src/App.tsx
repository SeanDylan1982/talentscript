import React, { Suspense } from 'react';
import { StackHandler, StackProvider, StackTheme } from "@stackframe/react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ResumeBuilder } from '@/components/resume-builder/ResumeBuilder';
import { stackClientApp } from './stack';
import './App.css';

function HandlerRoutes() {
  const location = useLocation();
  
  return (
    <StackHandler app={stackClientApp} location={location.pathname} fullPage />
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
        <StackProvider app={stackClientApp}>
          <StackTheme>
            <Routes>
              <Route path="/handler/*" element={<HandlerRoutes />} />
              <Route path="/*" element={<ResumeBuilder />} />
            </Routes>
          </StackTheme>
        </StackProvider>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;