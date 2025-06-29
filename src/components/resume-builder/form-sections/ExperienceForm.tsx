import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { useResume } from '@/contexts/ResumeContext';
import { WorkExperience } from '@/types/resume';

export function ExperienceForm() {
  const { state, dispatch } = useResume();
  const { experience } = state.resumeData;

  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrentJob: false,
      description: ['']
    };
    dispatch({ type: 'ADD_EXPERIENCE', payload: newExperience });
  };

  const updateExperience = (id: string, data: Partial<WorkExperience>) => {
    dispatch({ type: 'UPDATE_EXPERIENCE', payload: { id, data } });
  };

  const deleteExperience = (id: string) => {
    dispatch({ type: 'DELETE_EXPERIENCE', payload: id });
  };

  const addDescriptionBullet = (experienceId: string) => {
    const exp = experience.find(e => e.id === experienceId);
    if (exp) {
      updateExperience(experienceId, {
        description: [...exp.description, '']
      });
    }
  };

  const updateDescriptionBullet = (experienceId: string, index: number, value: string) => {
    const exp = experience.find(e => e.id === experienceId);
    if (exp) {
      const newDescription = [...exp.description];
      newDescription[index] = value;
      updateExperience(experienceId, { description: newDescription });
    }
  };

  const removeDescriptionBullet = (experienceId: string, index: number) => {
    const exp = experience.find(e => e.id === experienceId);
    if (exp && exp.description.length > 1) {
      const newDescription = exp.description.filter((_, i) => i !== index);
      updateExperience(experienceId, { description: newDescription });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium text-gray-900">Work Experience</h3>
        <Button onClick={addExperience} size="sm">
          <Plus className="w-4 h-4 mr-1" />
          Add Experience
        </Button>
      </div>

      {experience.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">No work experience added yet.</p>
            <Button onClick={addExperience} className="mt-2" variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              Add Your First Job
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {experience.map((exp, index) => (
            <Card key={exp.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    {exp.jobTitle || `Position ${index + 1}`}
                  </CardTitle>
                  <div className="flex items-center space-x-1">
                    <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteExperience(exp.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Job Title *</Label>
                    <Input
                      value={exp.jobTitle}
                      onChange={(e) => updateExperience(exp.id, { jobTitle: e.target.value })}
                      placeholder="Software Engineer"
                    />
                  </div>
                  
                  <div>
                    <Label>Company *</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                      placeholder="Tech Company Inc."
                    />
                  </div>
                </div>

                <div>
                  <Label>Location</Label>
                  <Input
                    value={exp.location}
                    onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                    placeholder="San Francisco, CA"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date *</Label>
                    <Input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                      disabled={exp.isCurrentJob}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`current-${exp.id}`}
                    checked={exp.isCurrentJob}
                    onCheckedChange={(checked) => 
                      updateExperience(exp.id, { 
                        isCurrentJob: checked as boolean,
                        endDate: checked ? '' : exp.endDate
                      })
                    }
                  />
                  <Label htmlFor={`current-${exp.id}`}>I currently work here</Label>
                </div>

                <div>
                  <Label>Job Description</Label>
                  <div className="space-y-2">
                    {exp.description.map((bullet, bulletIndex) => (
                      <div key={bulletIndex} className="flex items-start space-x-2">
                        <Textarea
                          value={bullet}
                          onChange={(e) => updateDescriptionBullet(exp.id, bulletIndex, e.target.value)}
                          placeholder="Describe your responsibilities and achievements..."
                          className="min-h-[60px]"
                        />
                        {exp.description.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeDescriptionBullet(exp.id, bulletIndex)}
                            className="text-red-600 hover:text-red-700 mt-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addDescriptionBullet(exp.id)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Bullet Point
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}