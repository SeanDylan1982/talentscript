import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, X } from 'lucide-react';
import { useResume } from '@/contexts/ResumeContext';
import { Project } from '@/types/resume';

export function ProjectsForm() {
  const { state, dispatch } = useResume();
  const { projects } = state.resumeData;

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      url: '',
      startDate: '',
      endDate: ''
    };
    dispatch({ type: 'ADD_PROJECT', payload: newProject });
  };

  const updateProject = (id: string, data: Partial<Project>) => {
    dispatch({ type: 'UPDATE_PROJECT', payload: { id, data } });
  };

  const deleteProject = (id: string) => {
    dispatch({ type: 'DELETE_PROJECT', payload: id });
  };

  const addTechnology = (projectId: string, tech: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project && tech.trim() && !project.technologies.includes(tech.trim())) {
      updateProject(projectId, {
        technologies: [...project.technologies, tech.trim()]
      });
    }
  };

  const removeTechnology = (projectId: string, techIndex: number) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      const newTechnologies = project.technologies.filter((_, index) => index !== techIndex);
      updateProject(projectId, { technologies: newTechnologies });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium text-gray-900">Projects</h3>
        <Button onClick={addProject} size="sm">
          <Plus className="w-4 h-4 mr-1" />
          Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">No projects added yet.</p>
            <Button onClick={addProject} className="mt-2" variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              Add Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {projects.map((project, index) => (
            <Card key={project.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    {project.name || `Project ${index + 1}`}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteProject(project.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <Label>Project Name *</Label>
                  <Input
                    value={project.name}
                    onChange={(e) => updateProject(project.id, { name: e.target.value })}
                    placeholder="E-commerce Website"
                  />
                </div>
                
                <div>
                  <Label>Description *</Label>
                  <Textarea
                    value={project.description}
                    onChange={(e) => updateProject(project.id, { description: e.target.value })}
                    placeholder="Describe what the project does and your role in it..."
                    className="min-h-[80px]"
                  />
                </div>

                <div>
                  <Label>Project URL (Optional)</Label>
                  <Input
                    value={project.url || ''}
                    onChange={(e) => updateProject(project.id, { url: e.target.value })}
                    placeholder="https://github.com/username/project"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="month"
                      value={project.startDate}
                      onChange={(e) => updateProject(project.id, { startDate: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label>End Date (Optional)</Label>
                    <Input
                      type="month"
                      value={project.endDate || ''}
                      onChange={(e) => updateProject(project.id, { endDate: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label>Technologies Used</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="flex items-center space-x-1">
                        <span>{tech}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTechnology(project.id, techIndex)}
                          className="h-auto p-0 ml-1 hover:bg-transparent"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <Input
                    placeholder="Add technology (press Enter)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const input = e.target as HTMLInputElement;
                        addTechnology(project.id, input.value);
                        input.value = '';
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}