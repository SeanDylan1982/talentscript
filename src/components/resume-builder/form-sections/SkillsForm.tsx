import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { useResume } from '@/contexts/ResumeContext';
import { Skill } from '@/types/resume';

export function SkillsForm() {
  const { state, dispatch } = useResume();
  const { skills } = state.resumeData;
  const [newSkillName, setNewSkillName] = React.useState('');
  const [newSkillLevel, setNewSkillLevel] = React.useState<Skill['level']>('Intermediate');

  const addSkill = () => {
    if (newSkillName.trim()) {
      const newSkill: Skill = {
        id: Date.now().toString(),
        name: newSkillName.trim(),
        level: newSkillLevel
      };
      dispatch({ type: 'ADD_SKILL', payload: newSkill });
      setNewSkillName('');
      setNewSkillLevel('Intermediate');
    }
  };

  const deleteSkill = (id: string) => {
    dispatch({ type: 'DELETE_SKILL', payload: id });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-4 m-4 p-2">
      <h3 className="text-base font-medium text-gray-900">Skills</h3>
      
      <div className="space-y-3 m-2">
        <div className="flex space-x-2">
          <div className="flex-1">
            <Label htmlFor="skill-name">Skill Name</Label>
            <Input
              id="skill-name"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="JavaScript, Project Management, etc."
            />
          </div>
          
          <div className="w-32">
            <Label>Level</Label>
            <Select value={newSkillLevel} onValueChange={(value: Skill['level']) => setNewSkillLevel(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
                <SelectItem value="Expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="pt-6">
            <Button onClick={addSkill} disabled={!newSkillName.trim()}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {skills.length > 0 && (
          <div className="space-y-2 mb-4 pb-4">
            <Label>Your Skills</Label>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill.id} variant="secondary" className="flex items-center space-x-1">
                  <span>{skill.name}</span>
                  <span className="text-xs opacity-70">({skill.level})</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteSkill(skill.id)}
                    className="h-auto p-0 ml-1 hover:bg-transparent"
                  >
                    <X className="w-3 h-3 " />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}