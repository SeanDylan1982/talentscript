import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export function ModernTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, references, sections, customization } = data;
  
  const visibleSections = sections.filter(section => section.isVisible).sort((a, b) => a.order - b.order);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const renderSection = (section: typeof sections[0]) => {
    switch (section.type) {
      case 'personalInfo':
        return (
          <div key={section.id} className="mb-6">
            <div className="flex items-center space-x-4">
              {customization.showProfileImage && personalInfo.profileImage && (
                <img
                  src={personalInfo.profileImage}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border-2"
                  style={{ borderColor: customization.accentColor }}
                />
              )}
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2" 
                    style={{ fontFamily: customization.fontFamily, color: customization.accentColor }}>
                  {personalInfo.fullName || 'Your Name'}
                </h1>
                
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  {personalInfo.email && (
                    <div className="flex items-center">
                      <Mail className="w-3 h-3 mr-2" style={{ color: customization.accentColor }} />
                      {personalInfo.email}
                    </div>
                  )}
                  {personalInfo.phone && (
                    <div className="flex items-center">
                      <Phone className="w-3 h-3 mr-2" style={{ color: customization.accentColor }} />
                      {personalInfo.phone}
                    </div>
                  )}
                  {personalInfo.location && (
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-2" style={{ color: customization.accentColor }} />
                      {personalInfo.location}
                    </div>
                  )}
                  {personalInfo.website && (
                    <div className="flex items-center">
                      <Globe className="w-3 h-3 mr-2" style={{ color: customization.accentColor }} />
                      Website
                    </div>
                  )}
                  {personalInfo.linkedin && (
                    <div className="flex items-center">
                      <Linkedin className="w-3 h-3 mr-2" style={{ color: customization.accentColor }} />
                      LinkedIn
                    </div>
                  )}
                  {personalInfo.github && (
                    <div className="flex items-center">
                      <Github className="w-3 h-3 mr-2" style={{ color: customization.accentColor }} />
                      GitHub
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'summary':
        if (!summary) return null;
        return (
          <div key={section.id} className="mb-5">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full mr-3" style={{ backgroundColor: customization.accentColor }}></div>
              <h2 className="text-base font-bold text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                Professional Summary
              </h2>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed pl-9" style={{ fontFamily: customization.fontFamily }}>
              {summary}
            </p>
          </div>
        );

      case 'experience':
        if (experience.length === 0) return null;
        return (
          <div key={section.id} className="mb-5">
            <div className="flex items-center mb-3">
              <div className="w-6 h-6 rounded-full mr-3" style={{ backgroundColor: customization.accentColor }}></div>
              <h2 className="text-base font-bold text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                Work Experience
              </h2>
            </div>
            <div className="space-y-4 pl-9">
              {experience.map((exp) => (
                <div key={exp.id} className="relative break-inside-avoid">
                  <div className="absolute -left-5 top-2 w-2 h-2 rounded-full" 
                       style={{ backgroundColor: customization.accentColor }}></div>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                        {exp.jobTitle}
                      </h3>
                      <p className="text-sm font-medium" style={{ color: customization.accentColor, fontFamily: customization.fontFamily }}>
                        {exp.company}{exp.location && `, ${exp.location}`}
                      </p>
                    </div>
                    <div className="px-2 py-1 rounded text-xs text-white" 
                         style={{ backgroundColor: customization.accentColor, fontFamily: customization.fontFamily }}>
                      {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-gray-700">
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
            <div className="flex items-center mb-3">
              <div className="w-6 h-6 rounded-full mr-3" style={{ backgroundColor: customization.accentColor }}></div>
              <h2 className="text-base font-bold text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                Education
              </h2>
            </div>
            <div className="space-y-3 pl-9">
              {education.map((edu) => (
                <div key={edu.id} className="relative break-inside-avoid">
                  <div className="absolute -left-5 top-2 w-2 h-2 rounded-full" 
                       style={{ backgroundColor: customization.accentColor }}></div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                        {edu.degree}
                      </h3>
                      <p className="text-sm font-medium" style={{ color: customization.accentColor, fontFamily: customization.fontFamily }}>
                        {edu.school}{edu.location && `, ${edu.location}`}
                      </p>
                      {edu.gpa && (
                        <p className="text-xs text-gray-600" style={{ fontFamily: customization.fontFamily }}>
                          GPA: {edu.gpa}
                        </p>
                      )}
                    </div>
                    <div className="px-2 py-1 rounded text-xs text-white" 
                         style={{ backgroundColor: customization.accentColor, fontFamily: customization.fontFamily }}>
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
            <div className="flex items-center mb-3">
              <div className="w-6 h-6 rounded-full mr-3" style={{ backgroundColor: customization.accentColor }}></div>
              <h2 className="text-base font-bold text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                Skills
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-2 pl-9">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between p-2 rounded" 
                     style={{ backgroundColor: customization.accentColor + '10' }}>
                  <span className="text-sm font-medium" style={{ fontFamily: customization.fontFamily }}>{skill.name}</span>
                  <span className="text-xs px-2 py-1 rounded text-white" 
                        style={{ backgroundColor: customization.accentColor, fontFamily: customization.fontFamily }}>
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
            <div className="flex items-center mb-3">
              <div className="w-6 h-6 rounded-full mr-3" style={{ backgroundColor: customization.accentColor }}></div>
              <h2 className="text-base font-bold text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                Certifications
              </h2>
            </div>
            <div className="space-y-2 pl-9">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-start p-2 rounded break-inside-avoid" 
                     style={{ backgroundColor: customization.accentColor + '10' }}>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                      {cert.name}
                    </h3>
                    <p className="text-sm text-gray-700" style={{ fontFamily: customization.fontFamily }}>
                      {cert.issuer}
                    </p>
                  </div>
                  <div className="text-xs px-2 py-1 rounded text-white" 
                       style={{ backgroundColor: customization.accentColor, fontFamily: customization.fontFamily }}>
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
            <div className="flex items-center mb-3">
              <div className="w-6 h-6 rounded-full mr-3" style={{ backgroundColor: customization.accentColor }}></div>
              <h2 className="text-base font-bold text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                Projects
              </h2>
            </div>
            <div className="space-y-3 pl-9">
              {projects.map((project) => (
                <div key={project.id} className="p-3 rounded break-inside-avoid" style={{ backgroundColor: customization.accentColor + '10' }}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                      {project.name}
                    </h3>
                    <div className="text-xs px-2 py-1 rounded text-white" 
                         style={{ backgroundColor: customization.accentColor, fontFamily: customization.fontFamily }}>
                      {formatDate(project.startDate)}
                      {project.endDate && ` - ${formatDate(project.endDate)}`}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2" style={{ fontFamily: customization.fontFamily }}>
                    {project.description}
                  </p>
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs rounded text-white"
                          style={{ backgroundColor: customization.accentColor, fontFamily: customization.fontFamily }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {project.url && (
                    <p className="text-xs" style={{ color: customization.accentColor, fontFamily: customization.fontFamily }}>
                      {project.url}
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
            <div className="flex items-center mb-3">
              <div className="w-6 h-6 rounded-full mr-3" style={{ backgroundColor: customization.accentColor }}></div>
              <h2 className="text-base font-bold text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                Professional References
              </h2>
            </div>
            <div className="space-y-3 pl-9">
              {references.map((ref) => (
                <div key={ref.id} className="p-3 rounded break-inside-avoid" style={{ backgroundColor: customization.accentColor + '10' }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                        {ref.name}
                      </h3>
                      <p className="text-sm font-medium" style={{ color: customization.accentColor, fontFamily: customization.fontFamily }}>
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
    <div className="bg-white p-6 min-h-full" style={{ fontFamily: customization.fontFamily, fontSize: '14px', lineHeight: '1.4' }}>
      {visibleSections.map(renderSection)}
    </div>
  );
}