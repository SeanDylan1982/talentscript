import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export function CreativeTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, references, sections, customization } = data;
  
  const visibleSections = sections.filter(section => section.isVisible).sort((a, b) => a.order - b.order);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const leftSections = visibleSections.filter(section => 
    ['personalInfo', 'skills', 'certifications', 'references'].includes(section.type)
  );
  
  const rightSections = visibleSections.filter(section => 
    ['summary', 'experience', 'education', 'projects'].includes(section.type)
  );

  const renderLeftSection = (section: typeof sections[0]) => {
    switch (section.type) {
      case 'personalInfo':
        return (
          <div key={section.id} className="text-center mb-6">
            {customization.showProfileImage && personalInfo.profileImage && (
              <img
                src={personalInfo.profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-4 border-white shadow-lg"
              />
            )}
            <h1 className="text-xl font-bold text-white mb-3" style={{ fontFamily: customization.fontFamily }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            
            <div className="space-y-2 text-sm">
              {personalInfo.email && (
                <div className="flex items-center text-white">
                  <Mail className="w-3 h-3 mr-2" />
                  <span style={{ fontFamily: customization.fontFamily }}>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center text-white">
                  <Phone className="w-3 h-3 mr-2" />
                  <span style={{ fontFamily: customization.fontFamily }}>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center text-white">
                  <MapPin className="w-3 h-3 mr-2" />
                  <span style={{ fontFamily: customization.fontFamily }}>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center text-white">
                  <Globe className="w-3 h-3 mr-2" />
                  <span style={{ fontFamily: customization.fontFamily }}>Website</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center text-white">
                  <Linkedin className="w-3 h-3 mr-2" />
                  <span style={{ fontFamily: customization.fontFamily }}>LinkedIn</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center text-white">
                  <Github className="w-3 h-3 mr-2" />
                  <span style={{ fontFamily: customization.fontFamily }}>GitHub</span>
                </div>
              )}
            </div>
          </div>
        );

      case 'skills':
        if (skills.length === 0) return null;
        return (
          <div key={section.id} className="mb-6">
            <h2 className="text-base font-bold text-white mb-3 pb-2 border-b border-white border-opacity-30" 
                style={{ fontFamily: customization.fontFamily }}>
              Skills
            </h2>
            <div className="space-y-2">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between text-white text-sm mb-1">
                    <span style={{ fontFamily: customization.fontFamily }}>{skill.name}</span>
                    <span style={{ fontFamily: customization.fontFamily }}>{skill.level}</span>
                  </div>
                  <div className="w-full bg-white bg-opacity-20 rounded-full h-1.5">
                    <div 
                      className="bg-white h-1.5 rounded-full" 
                      style={{ 
                        width: skill.level === 'Expert' ? '100%' : 
                               skill.level === 'Advanced' ? '80%' : 
                               skill.level === 'Intermediate' ? '60%' : '40%' 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'certifications':
        if (certifications.length === 0) return null;
        return (
          <div key={section.id} className="mb-6">
            <h2 className="text-base font-bold text-white mb-3 pb-2 border-b border-white border-opacity-30" 
                style={{ fontFamily: customization.fontFamily }}>
              Certifications
            </h2>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.id} className="break-inside-avoid">
                  <h3 className="font-semibold text-white text-sm" style={{ fontFamily: customization.fontFamily }}>
                    {cert.name}
                  </h3>
                  <p className="text-white text-opacity-80 text-sm" style={{ fontFamily: customization.fontFamily }}>
                    {cert.issuer}
                  </p>
                  <p className="text-white text-opacity-60 text-xs" style={{ fontFamily: customization.fontFamily }}>
                    {formatDate(cert.date)}
                    {cert.expirationDate && ` - ${formatDate(cert.expirationDate)}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'references':
        if (references.length === 0) return null;
        return (
          <div key={section.id} className="mb-6">
            <h2 className="text-base font-bold text-white mb-3 pb-2 border-b border-white border-opacity-30" 
                style={{ fontFamily: customization.fontFamily }}>
              References
            </h2>
            <div className="space-y-3">
              {references.map((ref) => (
                <div key={ref.id} className="break-inside-avoid">
                  <h3 className="font-semibold text-white text-sm" style={{ fontFamily: customization.fontFamily }}>
                    {ref.name}
                  </h3>
                  <p className="text-white text-opacity-80 text-sm" style={{ fontFamily: customization.fontFamily }}>
                    {ref.title}
                  </p>
                  <p className="text-white text-opacity-80 text-sm" style={{ fontFamily: customization.fontFamily }}>
                    {ref.company}
                  </p>
                  <p className="text-white text-opacity-60 text-xs" style={{ fontFamily: customization.fontFamily }}>
                    {ref.relationship}
                  </p>
                  <p className="text-white text-opacity-60 text-xs" style={{ fontFamily: customization.fontFamily }}>
                    {ref.email} • {ref.phone}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderRightSection = (section: typeof sections[0]) => {
    switch (section.type) {
      case 'summary':
        if (!summary) return null;
        return (
          <div key={section.id} className="mb-5">
            <h2 className="text-base font-bold mb-3 pb-2 border-b-2" 
                style={{ fontFamily: customization.fontFamily, color: customization.accentColor, borderColor: customization.accentColor }}>
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
            <h2 className="text-base font-bold mb-4 pb-2 border-b-2" 
                style={{ fontFamily: customization.fontFamily, color: customization.accentColor, borderColor: customization.accentColor }}>
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div key={exp.id} className="relative pl-6 break-inside-avoid">
                  <div className="absolute left-0 top-2 w-3 h-3 rounded-full border-4 border-white shadow-lg" 
                       style={{ backgroundColor: customization.accentColor }}></div>
                  {index < experience.length - 1 && (
                    <div className="absolute left-1.5 top-5 w-0.5 h-12" 
                         style={{ backgroundColor: customization.accentColor, opacity: 0.3 }}></div>
                  )}
                  
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                        {exp.jobTitle}
                      </h3>
                      <p className="text-sm font-semibold" style={{ color: customization.accentColor, fontFamily: customization.fontFamily }}>
                        {exp.company}{exp.location && `, ${exp.location}`}
                      </p>
                    </div>
                    <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded" 
                         style={{ fontFamily: customization.fontFamily }}>
                      {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-gray-700">
                    {exp.description.filter(desc => desc.trim()).map((desc, descIndex) => (
                      <li key={descIndex} style={{ fontFamily: customization.fontFamily }}>{desc}</li>
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
            <h2 className="text-base font-bold mb-4 pb-2 border-b-2" 
                style={{ fontFamily: customization.fontFamily, color: customization.accentColor, borderColor: customization.accentColor }}>
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={edu.id} className="relative pl-6 break-inside-avoid">
                  <div className="absolute left-0 top-2 w-3 h-3 rounded-full border-4 border-white shadow-lg" 
                       style={{ backgroundColor: customization.accentColor }}></div>
                  {index < education.length - 1 && (
                    <div className="absolute left-1.5 top-5 w-0.5 h-12" 
                         style={{ backgroundColor: customization.accentColor, opacity: 0.3 }}></div>
                  )}
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                        {edu.degree}
                      </h3>
                      <p className="text-sm font-semibold" style={{ color: customization.accentColor, fontFamily: customization.fontFamily }}>
                        {edu.school}{edu.location && `, ${edu.location}`}
                      </p>
                      {edu.gpa && (
                        <p className="text-xs text-gray-600" style={{ fontFamily: customization.fontFamily }}>
                          GPA: {edu.gpa}
                        </p>
                      )}
                    </div>
                    <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded" 
                         style={{ fontFamily: customization.fontFamily }}>
                      {formatDate(edu.graduationDate)}
                    </div>
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
            <h2 className="text-base font-bold mb-4 pb-2 border-b-2" 
                style={{ fontFamily: customization.fontFamily, color: customization.accentColor, borderColor: customization.accentColor }}>
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={project.id} className="relative pl-6 break-inside-avoid">
                  <div className="absolute left-0 top-2 w-3 h-3 rounded-full border-4 border-white shadow-lg" 
                       style={{ backgroundColor: customization.accentColor }}></div>
                  {index < projects.length - 1 && (
                    <div className="absolute left-1.5 top-5 w-0.5 h-16" 
                         style={{ backgroundColor: customization.accentColor, opacity: 0.3 }}></div>
                  )}
                  
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-bold text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                      {project.name}
                    </h3>
                    <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded" 
                         style={{ fontFamily: customization.fontFamily }}>
                      {formatDate(project.startDate)}
                      {project.endDate && ` - ${formatDate(project.endDate)}`}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2" style={{ fontFamily: customization.fontFamily }}>
                    {project.description}
                  </p>
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
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

      default:
        return null;
    }
  };

  return (
    <div className="bg-white flex min-h-full" style={{ fontFamily: customization.fontFamily, fontSize: '14px', lineHeight: '1.4' }}>
      {/* Left Sidebar */}
      <div className="w-1/3 p-5" style={{ backgroundColor: customization.accentColor }}>
        {leftSections.map(renderLeftSection)}
      </div>
      
      {/* Right Content */}
      <div className="w-2/3 p-5">
        {rightSections.map(renderRightSection)}
      </div>
    </div>
  );
}