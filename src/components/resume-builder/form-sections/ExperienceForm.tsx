import React, { useState } from 'react';
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
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverItem, setDragOverItem] = useState<string | null>(null);

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

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', id);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverItem(id);
  };

  const handleDragLeave = () => {
    setDragOverItem(null);
  };

  const handleDrop = (e: React.DragEvent, dropId: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === dropId) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    const draggedIndex = experience.findIndex(exp => exp.id === draggedItem);
    const dropIndex = experience.findIndex(exp => exp.id === dropId);

    if (draggedIndex === -1 || dropIndex === -1) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    const newExperience = [...experience];
    const [draggedExp] = newExperience.splice(draggedIndex, 1);
    newExperience.splice(dropIndex, 0, draggedExp);

    dispatch({ type: 'REORDER_EXPERIENCE', payload: newExperience });
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  return (
    <div className="space-y-4 m-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium text-gray-900">Work Experience</h3>
        <Button onClick={addExperience} size="sm">
          <Plus className="w-4 h-4 mr-1" />
          Add Experience
        </Button>
      </div>

      {experience.length === 0 ? (
        <Card className="p-6 text-center">
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">No work experience added yet.</p>
            <Button onClick={addExperience} className="mt-2" variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              Add Your First Job
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4 m-2 p-2">
          {experience.map((exp, index) => (
            <Card
              key={exp.id}
              className={`transition-all duration-200 ${
                draggedItem === exp.id ? "opacity-50 scale-95" : ""
              } ${
                dragOverItem === exp.id
                  ? "ring-2 ring-blue-500 ring-opacity-50"
                  : ""
              }`}
              draggable
              onDragStart={(e) => handleDragStart(e, exp.id)}
              onDragOver={(e) => handleDragOver(e, exp.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, exp.id)}
              onDragEnd={handleDragEnd}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    {exp.jobTitle || `Position ${index + 1}`}
                  </CardTitle>
                  <div className="flex items-center space-x-1">
                    <div
                      className="cursor-move p-1 hover:bg-gray-100 rounded"
                      title="Drag to reorder"
                    >
                      <GripVertical className="w-4 h-4 text-gray-400" />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteExperience(exp.id)}
                      className="text-gray-200 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>
                      Job Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={exp.jobTitle}
                      onChange={(e) =>
                        updateExperience(exp.id, { jobTitle: e.target.value })
                      }
                      placeholder="Software Engineer"
                    />
                  </div>

                  <div>
                    <Label>
                      Company <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(exp.id, { company: e.target.value })
                      }
                      placeholder="Tech Company Inc."
                    />
                  </div>
                </div>

                <div>
                  <Label>Location</Label>
                  <Input
                    value={exp.location}
                    onChange={(e) =>
                      updateExperience(exp.id, { location: e.target.value })
                    }
                    placeholder="San Francisco, CA"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>
                      Start Date <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) =>
                        updateExperience(exp.id, { startDate: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) =>
                        updateExperience(exp.id, { endDate: e.target.value })
                      }
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
                        endDate: checked ? "" : exp.endDate,
                      })
                    }
                  />
                  <Label htmlFor={`current-${exp.id}`}>
                    I currently work here
                  </Label>
                </div>

                <div>
                  <Label>Job Description</Label>
                  <div className="space-y-2">
                    {exp.description.map((bullet, bulletIndex) => (
                      <div
                        key={bulletIndex}
                        className="flex items-start space-x-2"
                      >
                        <Textarea
                          value={bullet}
                          onChange={(e) =>
                            updateDescriptionBullet(
                              exp.id,
                              bulletIndex,
                              e.target.value
                            )
                          }
                          placeholder="Describe your responsibilities and achievements..."
                          className="min-h-[80px]"
                        />
                        {exp.description.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              removeDescriptionBullet(exp.id, bulletIndex)
                            }
                            className="text-gray-200 hover:text-red-700 mt-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="default"
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