import React, { useEffect } from 'react';
import { ResumeBuilder } from '@/components/resume-builder/ResumeBuilder';
import { DatabaseService } from '@/lib/database';
import './App.css';

function App() {
  useEffect(() => {
    // Initialize database on app start
    DatabaseService.initializeDatabase().catch(console.error);
  }, []);

  return <ResumeBuilder />;
}

export default App;