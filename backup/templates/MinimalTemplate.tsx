import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export function MinimalTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, references, sections, customization } = data;
  
  const visibleSections = sections.filter(section => section.isVisible).sort((a, b) => a.order - b.order);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const formatUrl = (url: string) => {
    if (!url) return '';
    // Remove protocol and www for cleaner display
    return url.replace(/^https?:\/\/(www\.)?/, '');
  };

  const renderSection = (section: typeof sections[0]) => {
    switch (section.type) {
      case 'personalInfo':
        return (
          <div key={section.id} className="mb-6">
            <div className="text-center">
              {customization.showProfileImage && personalInfo.profileImage && (
                <img
                  src={personalInfo.profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-gray-200"
                />
              )}
              <h1 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: customization.fontFamily }}>
                {personalInfo.fullName || 'Your Name'}
              </h1>
              
              <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600 mb-2">
                {personalInfo.email && (
                  <div className="flex items-center">
                    <Mail className="w-3 h-3 mr-1" />
                    {personalInfo.email}
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center">
                    <Phone className="w-3 h-3 mr-1" />
                    {personalInfo.phone}
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {personalInfo.location}
                  </div>
                )}
              </div>
              
              {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
                <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
                  {personalInfo.website && (
                    <div className="flex items-center">
                      <Globe className="w-3 h-3 mr-1" />
                      {formatUrl(personalInfo.website)}
                    </div>
                  )}
                  {personalInfo.linkedin && (
                    <div className="flex items-center">
                      <Linkedin className="w-3 h-3 mr-1" />
                      {formatUrl(personalInfo.linkedin)}
                    </div>
                  )}
                  {personalInfo.github && (
                    <div className="flex items-center">
                      <Github className="w-3 h-3 mr-1" />
                      {formatUrl(personalInfo.github)}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );

      case 'summary':
        if (!summary) return null;
        return (
          <div key={section.id} className="mb-5">
            <h2 className="text-base font-semibold text-gray-900 mb-2 pb-1 border-b" 
                style={{ fontFamily: customization.fontFamily, borderColor: customization.accentColor }}>
              Professional Summary
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: customization.fontFamily }}>
              {summary}
            </p>
          </div>
        );

      case 'experience':
        if (experience.length === 0) return null;
        return (
          <div key={section.id} className="mb-5">
            <h2 className="text-base font-semibold text-gray-900 mb-3 pb-1 border-b" 
                style={{ fontFamily: customization.fontFamily, borderColor: customization.accentColor }}>
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                        {exp.jobTitle}
                      </h3>
                      <p className="text-sm text-gray-700" style={{ fontFamily: customization.fontFamily }}>
                        {exp.company}{exp.location && `, ${exp.location}`}
                      </p>
                    </div>
                    <div className="text-xs text-gray-600" style={{ fontFamily: customization.fontFamily }}>
                      {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-gray-700 ml-3">
                    {exp.description.filter(desc => desc.trim()).map((desc, index) => (
                      <li key={index} style={{ fontFamily: customization.fontFamily }}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        if (education.length === 0) return null;
        return (
          <div key={section.id} className="mb-5">
            <h2 className="text-base font-semibold text-gray-900 mb-3 pb-1 border-b" 
                style={{ fontFamily: customization.fontFamily, borderColor: customization.accentColor }}>
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="break-inside-avoid">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                        {edu.degree}
                      </h3>
                      <p className="text-sm text-gray-700" style={{ fontFamily: customization.fontFamily }}>
                        {edu.school}{edu.location && `, ${edu.location}`}
                      </p>
                      {edu.gpa && (
                        <p className="text-xs text-gray-600" style={{ fontFamily: customization.fontFamily }}>
                          GPA: {edu.gpa}
                        </p>
                      )}
                    </div>
                    <div className="text-xs text-gray-600" style={{ fontFamily: customization.fontFamily }}>
                      {formatDate(edu.graduationDate)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        if (skills.length === 0) return null;
        return (
          <div key={section.id} className="mb-5">
            <h2 className="text-base font-semibold text-gray-900 mb-3 pb-1 border-b" 
                style={{ fontFamily: customization.fontFamily, borderColor: customization.accentColor }}>
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill) => (
                <div key={skill.id} className="flex justify-between text-sm">
                  <span style={{ fontFamily: customization.fontFamily }}>{skill.name}</span>
                  <span className="text-xs text-gray-600" style={{ fontFamily: customization.fontFamily }}>
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'certifications':
        if (certifications.length === 0) return null;
        return (
          <div key={section.id} className="mb-5">
            <h2 className="text-base font-semibold text-gray-900 mb-3 pb-1 border-b" 
                style={{ fontFamily: customization.fontFamily, borderColor: customization.accentColor }}>
              Certifications
            </h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-start break-inside-avoid">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                      {cert.name}
                    </h3>
                    <p className="text-sm text-gray-700" style={{ fontFamily: customization.fontFamily }}>
                      {cert.issuer}
                    </p>
                  </div>
                  <div className="text-xs text-gray-600" style={{ fontFamily: customization.fontFamily }}>
                    {formatDate(cert.date)}
                    {cert.expirationDate && ` - ${formatDate(cert.expirationDate)}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        if (projects.length === 0) return null;
        return (
          <div key={section.id} className="mb-5">
            <h2 className="text-base font-semibold text-gray-900 mb-3 pb-1 border-b" 
                style={{ fontFamily: customization.fontFamily, borderColor: customization.accentColor }}>
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="break-inside-avoid">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                      {project.name}
                    </h3>
                    <div className="text-xs text-gray-600" style={{ fontFamily: customization.fontFamily }}>
                      {formatDate(project.startDate)}
                      {project.endDate && ` - ${formatDate(project.endDate)}`}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2" style={{ fontFamily: customization.fontFamily }}>
                    {project.description}
                  </p>
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-1">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs rounded"
                          style={{ 
                            backgroundColor: customization.accentColor + '20', 
                            color: customization.accentColor,
                            fontFamily: customization.fontFamily 
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {project.url && (
                    <p className="text-xs text-gray-600" style={{ fontFamily: customization.fontFamily }}>
                      {formatUrl(project.url)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'references':
        if (references.length === 0) return null;
        return (
          <div key={section.id} className="mb-5">
            <h2 className="text-base font-semibold text-gray-900 mb-3 pb-1 border-b" 
                style={{ fontFamily: customization.fontFamily, borderColor: customization.accentColor }}>
              Professional References
            </h2>
            <div className="space-y-3">
              {references.map((ref) => (
                <div key={ref.id} className="break-inside-avoid">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                        {ref.name}
                      </h3>
                      <p className="text-sm text-gray-700" style={{ fontFamily: customization.fontFamily }}>
                        {ref.title} at {ref.company}
                      </p>
                      <p className="text-xs text-gray-600" style={{ fontFamily: customization.fontFamily }}>
                        {ref.relationship}
                      </p>
                    </div>
                    <div className="text-xs text-gray-600 text-right" style={{ fontFamily: customization.fontFamily }}>
                      <div>{ref.email}</div>
                      <div>{ref.phone}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white min-h-full" style={{ fontFamily: customization.fontFamily, fontSize: '14px', lineHeight: '1.4' }}>
      {visibleSections.map(renderSection)}
    </div>
  );
}