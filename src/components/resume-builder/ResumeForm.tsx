import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalInfoForm } from './form-sections/PersonalInfoForm';
import { SummaryForm } from './form-sections/SummaryForm';
import { ExperienceForm } from './form-sections/ExperienceForm';
import { EducationForm } from './form-sections/EducationForm';
import { SkillsForm } from './form-sections/SkillsForm';
import { CertificationsForm } from './form-sections/CertificationsForm';
import { ProjectsForm } from './form-sections/ProjectsForm';
import { ReferencesForm } from './form-sections/ReferencesForm';
import { CustomizationForm } from './form-sections/CustomizationForm';
import { User, FileText, Briefcase, Palette } from 'lucide-react';

export function ResumeForm() {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Resume Information</h2>
      
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="personal" className="text-xs">
            <User className="w-4 h-4 mr-1" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="content" className="text-xs">
            <FileText className="w-4 h-4 mr-1" />
            Content
          </TabsTrigger>
          <TabsTrigger value="experience" className="text-xs">
            <Briefcase className="w-4 h-4 mr-1" />
            Experience
          </TabsTrigger>
          <TabsTrigger value="customize" className="text-xs">
            <Palette className="w-4 h-4 mr-1" />
            Style
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="space-y-6">
          <PersonalInfoForm />
        </TabsContent>
        
        <TabsContent value="content" className="space-y-6">
          <SummaryForm />
          <EducationForm />
          <SkillsForm />
          <CertificationsForm />
          <ProjectsForm />
          <ReferencesForm />
        </TabsContent>
        
        <TabsContent value="experience" className="space-y-6">
          <ExperienceForm />
        </TabsContent>
        
        <TabsContent value="customize" className="space-y-6">
          <CustomizationForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}