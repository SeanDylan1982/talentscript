import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Award, Briefcase, GraduationCap, Code, BookOpen } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export function ExecutiveTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, sections, customization } = data;
  
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
          <div key={section.id} className="mb-8">
            <div className="text-center mb-2">
              <h1 className="text-2xl font-bold uppercase tracking-wider mb-1" 
                  style={{ color: '#2c3e50', fontFamily: customization.fontFamily }}>
                {personalInfo.fullName || 'Your Name'}
              </h1>
              {personalInfo.title && (
                <p className="text-sm font-medium" style={{ color: customization.accentColor, fontFamily: customization.fontFamily }}>
                  {personalInfo.title}
                </p>
              )}
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-gray-600">
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
          <div key={section.id} className="mb-6">
            <div className="flex items-center mb-2">
              <div className="w-6 h-0.5 mr-2" style={{ backgroundColor: customization.accentColor }}></div>
              <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#2c3e50', fontFamily: customization.fontFamily }}>
                Executive Profile
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
          <div key={section.id} className="mb-6">
            <div className="flex items-center mb-3">
              <Briefcase className="w-4 h-4 mr-2" style={{ color: customization.accentColor }} />
              <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#2c3e50', fontFamily: customization.fontFamily }}>
                Professional Experience
              </h2>
            </div>
            <div className="space-y-5">
              {experience.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <h3 className="text-sm font-semibold" style={{ color: '#2c3e50', fontFamily: customization.fontFamily }}>
                        {exp.jobTitle}
                      </h3>
                      <p className="text-xs font-medium" style={{ color: customization.accentColor, fontFamily: customization.fontFamily }}>
                        {exp.company}{exp.location && ` • ${exp.location}`}
                      </p>
                    </div>
                    <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                      {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <ul className="mt-2 space-y-1.5">
                    {exp.description.filter(desc => desc.trim()).map((desc, index) => (
                      <li key={index} className="text-xs text-gray-700 flex" style={{ fontFamily: customization.fontFamily }}>
                        <span className="text-gray-400 mr-1.5">•</span>
                        <span>{desc}</span>
                      </li>
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
          <div key={section.id} className="mb-6">
            <div className="flex items-center mb-3">
              <GraduationCap className="w-4 h-4 mr-2" style={{ color: customization.accentColor }} />
              <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#2c3e50', fontFamily: customization.fontFamily }}>
                Education
              </h2>
            </div>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <h3 className="text-sm font-semibold" style={{ color: '#2c3e50', fontFamily: customization.fontFamily }}>
                        {edu.degree}
                      </h3>
                      <p className="text-xs font-medium" style={{ color: customization.accentColor, fontFamily: customization.fontFamily }}>
                        {edu.school}{edu.location && `, ${edu.location}`}
                      </p>
                    </div>
                    <span className="text-xs text-gray-600">
                      {formatDate(edu.graduationDate)}
                    </span>
                  </div>
                  {edu.gpa && (
                    <p className="text-xs text-gray-600 mt-0.5" style={{ fontFamily: customization.fontFamily }}>
                      <span className="font-medium">GPA:</span> {edu.gpa}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        if (skills.length === 0) return null;
        return (
          <div key={section.id} className="mb-6">
            <div className="flex items-center mb-3">
              <Code className="w-4 h-4 mr-2" style={{ color: customization.accentColor }} />
              <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#2c3e50', fontFamily: customization.fontFamily }}>
                Core Competencies
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-start">
                  <span className="text-gray-400 mr-1.5 text-xs mt-0.5">•</span>
                  <span className="text-xs text-gray-700" style={{ fontFamily: customization.fontFamily }}>
                    {skill.name}{skill.level ? ` (${skill.level})` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'certifications':
        if (certifications.length === 0) return null;
        return (
          <div key={section.id} className="mb-6">
            <div className="flex items-center mb-3">
              <Award className="w-4 h-4 mr-2" style={{ color: customization.accentColor }} />
              <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#2c3e50', fontFamily: customization.fontFamily }}>
                Certifications
              </h2>
            </div>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-medium" style={{ color: '#2c3e50', fontFamily: customization.fontFamily }}>
                      {cert.name}
                    </h3>
                    <span className="text-xs text-gray-600">
                      {cert.date && formatDate(cert.date)}
                    </span>
                  </div>
                  {cert.issuer && (
                    <p className="text-xs text-gray-600" style={{ fontFamily: customization.fontFamily }}>
                      {cert.issuer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        if (projects.length === 0) return null;
        return (
          <div key={section.id} className="mb-6">
            <div className="flex items-center mb-3">
              <BookOpen className="w-4 h-4 mr-2" style={{ color: customization.accentColor }} />
              <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#2c3e50', fontFamily: customization.fontFamily }}>
                Key Projects
              </h2>
            </div>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-semibold" style={{ color: '#2c3e50', fontFamily: customization.fontFamily }}>
                      {project.name}
                    </h3>
                    {project.url && (
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                        style={{ color: customization.accentColor }}
                      >
                        View Project
                      </a>
                    )}
                  </div>
                  {project.technologies && project.technologies.length > 0 && (
                    <p className="text-xs text-gray-600 mb-1" style={{ fontFamily: customization.fontFamily }}>
                      Technologies: {project.technologies.join(', ')}
                    </p>
                  )}
                  <p className="text-xs text-gray-700" style={{ fontFamily: customization.fontFamily }}>
                    {project.description}
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

  return (
    <div className="p-8 bg-white text-gray-800 max-w-4xl mx-auto" style={{ fontFamily: customization.fontFamily }}>
      {visibleSections.map(section => renderSection(section))}
    </div>
  );
}
