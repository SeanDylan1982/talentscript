import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Briefcase, GraduationCap, Code, Award, User } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export function CorporateTemplate({ data }: TemplateProps) {
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
          <div key={section.id} className="bg-gray-800 text-white p-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: customization.fontFamily }}>
                {personalInfo.fullName || 'Your Name'}
              </h1>
              <p className="text-sm text-gray-300 mb-4" style={{ fontFamily: customization.fontFamily }}>
                {personalInfo.title || 'Professional Title'}
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-300">
                {personalInfo.email && (
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center hover:text-white">
                    <Mail className="w-3.5 h-3.5 mr-1.5" />
                    {personalInfo.email}
                  </a>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center">
                    <Phone className="w-3.5 h-3.5 mr-1.5" />
                    {personalInfo.phone}
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1.5" />
                    {personalInfo.location}
                  </div>
                )}
                {personalInfo.website && (
                  <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} 
                     target="_blank" rel="noopener noreferrer" 
                     className="flex items-center hover:text-white">
                    <Globe className="w-3.5 h-3.5 mr-1.5" />
                    {formatUrl(personalInfo.website)}
                  </a>
                )}
                {personalInfo.linkedin && (
                  <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} 
                     target="_blank" rel="noopener noreferrer" 
                     className="flex items-center hover:text-white">
                    <Linkedin className="w-3.5 h-3.5 mr-1.5" />
                    {formatUrl(personalInfo.linkedin).split('/').pop()}
                  </a>
                )}
                {personalInfo.github && (
                  <a href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} 
                     target="_blank" rel="noopener noreferrer" 
                     className="flex items-center hover:text-white">
                    <Github className="w-3.5 h-3.5 mr-1.5" />
                    {formatUrl(personalInfo.github).split('/').pop()}
                  </a>
                )}
              </div>
            </div>
          </div>
        );

      case 'summary':
        if (!summary) return null;
        return (
          <div key={section.id} className="p-6 border-b">
            <h2 className="text-lg font-semibold mb-3 flex items-center" style={{ fontFamily: customization.fontFamily }}>
              <User className="w-4 h-4 mr-2 text-gray-600" />
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
          <div key={section.id} className="p-6 border-b">
            <h2 className="text-lg font-semibold mb-4 flex items-center" style={{ fontFamily: customization.fontFamily }}>
              <Briefcase className="w-4 h-4 mr-2 text-gray-600" />
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                        {exp.jobTitle}
                      </h3>
                      <p className="text-sm font-medium" style={{ color: customization.accentColor, fontFamily: customization.fontFamily }}>
                        {exp.company}
                        {exp.location && ` • ${exp.location}`}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <ul className="mt-2 space-y-1.5 pl-1">
                    {exp.description.filter(desc => desc.trim()).map((desc, index) => (
                      <li key={index} className="text-sm text-gray-700 flex" style={{ fontFamily: customization.fontFamily }}>
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
          <div key={section.id} className="p-6 border-b">
            <h2 className="text-lg font-semibold mb-4 flex items-center" style={{ fontFamily: customization.fontFamily }}>
              <GraduationCap className="w-4 h-4 mr-2 text-gray-600" />
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                        {edu.degree}
                      </h3>
                      <p className="text-sm text-gray-700" style={{ fontFamily: customization.fontFamily }}>
                        {edu.school}
                        {edu.location && `, ${edu.location}`}
                      </p>
                      {edu.gpa && (
                        <p className="text-xs text-gray-600 mt-0.5" style={{ fontFamily: customization.fontFamily }}>
                          GPA: {edu.gpa}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDate(edu.graduationDate)}
                    </span>
                  </div>
                  {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                    <div className="mt-1">
                      <p className="text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: customization.fontFamily }}>
                        Relevant Coursework:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.relevantCourses.map((course, i) => (
                          <span 
                            key={i} 
                            className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-700"
                            style={{ fontFamily: customization.fontFamily }}
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        if (skills.length === 0) return null;
        return (
          <div key={section.id} className="p-6 border-b">
            <h2 className="text-lg font-semibold mb-4 flex items-center" style={{ fontFamily: customization.fontFamily }}>
              <Code className="w-4 h-4 mr-2 text-gray-600" />
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div key={skill.id} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-800" style={{ fontFamily: customization.fontFamily }}>
                      {skill.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {skill.level}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full" 
                      style={{ 
                        width: skill.level === 'Expert' ? '100%' : 
                               skill.level === 'Advanced' ? '80%' : 
                               skill.level === 'Intermediate' ? '60%' : '40%',
                        backgroundColor: customization.accentColor
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
          <div key={section.id} className="p-6 border-b">
            <h2 className="text-lg font-semibold mb-4 flex items-center" style={{ fontFamily: customization.fontFamily }}>
              <Award className="w-4 h-4 mr-2 text-gray-600" />
              Certifications
            </h2>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                    {cert.name}
                  </h3>
                  <p className="text-sm text-gray-700" style={{ fontFamily: customization.fontFamily }}>
                    {cert.issuer}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(cert.date)}
                    {cert.expirationDate && ` - ${formatDate(cert.expirationDate)}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        if (projects.length === 0) return null;
        return (
          <div key={section.id} className="p-6 border-b">
            <h2 className="text-lg font-semibold mb-4 flex items-center" style={{ fontFamily: customization.fontFamily }}>
              <Code className="w-4 h-4 mr-2 text-gray-600" />
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                      {project.name}
                      {project.url && (
                        <a 
                          href={project.url.startsWith('http') ? project.url : `https://${project.url}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="ml-2 text-xs text-blue-600 hover:underline"
                        >
                          (View Project)
                        </a>
                      )}
                    </h3>
                    {project.startDate && (
                      <span className="text-xs text-gray-500">
                        {formatDate(project.startDate)}
                        {project.endDate ? ` - ${formatDate(project.endDate)}` : ' - Present'}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 mt-1" style={{ fontFamily: customization.fontFamily }}>
                    {project.description}
                  </p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, i) => (
                        <span 
                          key={i} 
                          className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-700"
                          style={{ fontFamily: customization.fontFamily }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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
    <div className="bg-white text-gray-800 max-w-4xl mx-auto shadow-lg overflow-hidden">
      {visibleSections.map(section => renderSection(section))}
    </div>
  );
}
