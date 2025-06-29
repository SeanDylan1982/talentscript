import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useResume } from '@/contexts/ResumeContext';

export function SummaryForm() {
  const { state, dispatch } = useResume();
  const { summary } = state.resumeData;

  const handleSummaryChange = (value: string) => {
    dispatch({
      type: 'UPDATE_SUMMARY',
      payload: value
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium text-gray-900">Professional Summary</h3>
      
      <div>
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          value={summary}
          onChange={(e) => handleSummaryChange(e.target.value)}
          placeholder="Write a brief professional summary highlighting your key skills, experience, and career objectives..."
          className="min-h-[120px]"
        />
        <p className="text-sm text-gray-500 mt-1">
          Write 2-3 sentences that capture your professional background and key strengths.
        </p>
      </div>
    </div>
  );
}