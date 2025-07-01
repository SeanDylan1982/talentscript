import React, { Suspense } from 'react';
import { ResumeBuilder } from '@/components/resume-builder/ResumeBuilder';
import './App.css';
import TestApi from '../src/components/TestApi.tsx';

function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading TalentScript...</p>
      </div>
    </div>}>
      <ResumeBuilder />
      <TestApi />
    </Suspense>
  );
}

export default App;