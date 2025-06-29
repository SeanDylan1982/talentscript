import React, { useState } from 'react';
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

interface ResumeFormProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function ResumeForm({ activeTab = 'personal', onTabChange }: ResumeFormProps) {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    onTabChange?.(tab);
  };

  const getTabDisplayName = (tab: string) => {
    switch (tab) {
      case 'personal':
        return 'Personal';
      case 'content':
        return 'Content';
      case 'experience':
        return 'Experience';
      case 'customize':
        return 'Style';
      default:
        return 'Personal';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Mini Navbar */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <h3 className="text-sm font-medium text-gray-900">Resume Information</h3>
        <p className="text-xs text-gray-500">
          Current Section: {getTabDisplayName(currentTab)}
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
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
              <div data-tutorial="personal-form">
                <PersonalInfoForm />
              </div>
            </TabsContent>
            
            <TabsContent value="content" className="space-y-6">
              <div data-tutorial="content-form">
                <SummaryForm />
                <EducationForm />
                <SkillsForm />
                <CertificationsForm />
                <ProjectsForm />
                <ReferencesForm />
              </div>
            </TabsContent>
            
            <TabsContent value="experience" className="space-y-6">
              <div data-tutorial="experience-form">
                <ExperienceForm />
              </div>
            </TabsContent>
            
            <TabsContent value="customize" className="space-y-6">
              <div data-tutorial="style-form">
                <CustomizationForm />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}