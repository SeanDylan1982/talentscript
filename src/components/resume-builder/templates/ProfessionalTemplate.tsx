import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export function ProfessionalTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, references, sections, customization } = data;
  
  const visibleSections = sections.filter(section => section.isVisible).sort((a, b) => a.order - b.order);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const formatUrl = (url: string) => {
    if (!url) return '';
    return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  };

  const renderSection = (section: typeof sections[0]) => {
    switch (section.type) {
      case 'personalInfo':
        return (
          <div key={section.id} className="mb-6">
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold mb-1 uppercase tracking-wider" 
                  style={{ color: customization.accentColor, fontFamily: customization.fontFamily }}>
                {personalInfo.fullName || 'Your Name'}
              </h1>
              {personalInfo.jobTitle && (
                <p className="text-sm font-medium text-gray-600" style={{ fontFamily: customization.fontFamily }}>
                  {personalInfo.jobTitle}
                </p>
              )}
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-600 border-t border-b border-gray-200 py-3">
              {personalInfo.email && (
                <div className="flex items-center">
                  <Mail className="w-3 h-3 mr-1" style={{ color: customization.accentColor }} />
                  {personalInfo.email}
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center">
                  <Phone className="w-3 h-3 mr-1" style={{ color: customization.accentColor }} />
                  {personalInfo.phone}
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" style={{ color: customization.accentColor }} />
                  {personalInfo.location}
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center">
                  <Globe className="w-3 h-3 mr-1" style={{ color: customization.accentColor }} />
                  {formatUrl(personalInfo.website)}
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center">
                  <Linkedin className="w-3 h-3 mr-1" style={{ color: customization.accentColor }} />
                  {formatUrl(personalInfo.linkedin)}
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center">
                  <Github className="w-3 h-3 mr-1" style={{ color: customization.accentColor }} />
                  {formatUrl(personalInfo.github)}
                </div>
              )}
            </div>
          </div>
        );

      case 'summary':
        if (!summary) return null;
        return (
          <div key={section.id} className="mb-5">
            <div className="flex items-center mb-2">
              <div className="w-4 h-0.5 mr-2" style={{ backgroundColor: customization.accentColor }}></div>
              <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: customization.accentColor, fontFamily: customization.fontFamily }}>
                Professional Summary
              </h2>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed" style={{ fontFamily: customization.fontFamily }}>
              {summary}
            </p>
          </div>
        );

      case 'experience':
        if (experience.length === 0) return null;
        return (
          <div key={section.id} className="mb-5">
            <div className="flex items-center mb-3">
              <div className="w-4 h-0.5 mr-2" style={{ backgroundColor: customization.accentColor }}></div>
              <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: customization.accentColor, fontFamily: customization.fontFamily }}>
                Professional Experience
              </h2>
            </div>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-semibold" style={{ fontFamily: customization.fontFamily }}>
                      {exp.jobTitle}
                    </h3>
                    <span className="text-xs text-gray-600">
                      {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span className="font-medium" style={{ color: customization.accentColor, fontFamily: customization.fontFamily }}>
                      {exp.company}{exp.location && ` • ${exp.location}`}
                    </span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-gray-700 pl-1">
                    {exp.description.filter(desc => desc.trim()).map((desc, index) => (
                      <li key={index} style={{ fontFamily: customization.fontFamily }}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      // Continue with other section types...
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white text-gray-800" style={{ fontFamily: customization.fontFamily }}>
      {visibleSections.map(section => renderSection(section))}
    </div>
  );
}
