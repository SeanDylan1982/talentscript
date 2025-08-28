import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Briefcase, GraduationCap, Code, Award, User } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export function ElegantTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, sections } = data;
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
          <div key={section.id} className="bg-gray-50 p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 space-y-4">
                <div>
                  <h1 className="text-3xl font-light text-gray-800" style={{ fontFamily: 'var(--font-sans)' }}>
                    {personalInfo.fullName || 'Your Name'}
                  </h1>
                  <div className="w-16 h-0.5 bg-gray-300 my-3"></div>
                  <p className="text-gray-600 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                    {personalInfo.title || 'Professional Title'}
                  </p>
                </div>
                
                <div className="space-y-3">
                  {personalInfo.email && (
                    <div className="flex items-center text-sm text-gray-700">
                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                      {personalInfo.email}
                    </div>
                  )}
                  {personalInfo.phone && (
                    <div className="flex items-center text-sm text-gray-700">
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                      {personalInfo.phone}
                    </div>
                  )}
                  {personalInfo.location && (
                    <div className="flex items-center text-sm text-gray-700">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      {personalInfo.location}
                    </div>
                  )}
                  {personalInfo.website && (
                    <div className="flex items-center text-sm text-gray-700">
                      <Globe className="w-4 h-4 mr-2 text-gray-500" />
                      {formatUrl(personalInfo.website)}
                    </div>
                  )}
                  {personalInfo.linkedin && (
                    <div className="flex items-center text-sm text-gray-700">
                      <Linkedin className="w-4 h-4 mr-2 text-gray-500" />
                      linkedin.com/in/...
                    </div>
                  )}
                </div>
              </div>
              
              {summary && (
                <div className="md:w-2/3 border-l border-gray-200 pl-8">
                  <h2 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                    <User className="w-4 h-4 mr-2 text-gray-600" />
                    Profile
                  </h2>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {summary}
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 'experience':
        if (experience.length === 0) return null;
        return (
          <div key={section.id} className="p-8">
            <h2 className="text-lg font-medium text-gray-800 mb-6 flex items-center">
              <Briefcase className="w-4 h-4 mr-2 text-gray-600" />
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-gray-200 pl-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <h3 className="text-base font-medium text-gray-900">
                      {exp.jobTitle}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {exp.company}
                    {exp.location && ` • ${exp.location}`}
                  </p>
                  <ul className="space-y-1.5 text-sm text-gray-700">
                    {exp.description.filter(desc => desc.trim()).map((desc, index) => (
                      <li key={index} className="flex">
                        <span className="text-gray-500 mr-2">•</span>
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
          <div key={section.id} className="p-8 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-800 mb-6 flex items-center">
              <GraduationCap className="w-4 h-4 mr-2 text-gray-600" />
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-gray-200 pl-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <h3 className="text-base font-medium text-gray-900">
                      {edu.degree}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {formatDate(edu.graduationDate)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {edu.school}
                    {edu.location && `, ${edu.location}`}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        if (skills.length === 0) return null;
        return (
          <div key={section.id} className="p-8">
            <h2 className="text-lg font-medium text-gray-800 mb-6 flex items-center">
              <Code className="w-4 h-4 mr-2 text-gray-600" />
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div key={skill.id} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-800">
                      {skill.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {skill.level}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full bg-gray-600" 
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

      case 'projects':
        if (projects.length === 0) return null;
        return (
          <div key={section.id} className="p-8 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-800 mb-6 flex items-center">
              <Code className="w-4 h-4 mr-2 text-gray-600" />
              Projects
            </h2>
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <h3 className="text-base font-medium text-gray-900">
                      {project.name}
                      {project.url && (
                        <a 
                          href={project.url.startsWith('http') ? project.url : `https://${project.url}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="ml-2 text-sm font-normal text-blue-600 hover:underline"
                        >
                          (View Project)
                        </a>
                      )}
                    </h3>
                    {project.startDate && (
                      <span className="text-sm text-gray-500">
                        {formatDate(project.startDate)}
                        {project.endDate ? ` - ${formatDate(project.endDate)}` : ' - Present'}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 mt-1">
                    {project.description}
                  </p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, i) => (
                        <span 
                          key={i} 
                          className="text-xs px-2 py-0.5 bg-gray-200 rounded-full text-gray-700"
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

      case 'certifications':
        if (certifications.length === 0) return null;
        return (
          <div key={section.id} className="p-8">
            <h2 className="text-lg font-medium text-gray-800 mb-6 flex items-center">
              <Award className="w-4 h-4 mr-2 text-gray-600" />
              Certifications
            </h2>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <h3 className="text-base font-medium text-gray-900">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {cert.issuer}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {formatDate(cert.date)}
                    {cert.expirationDate && ` - ${formatDate(cert.expirationDate)}`}
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
    <div className="bg-white text-gray-800 max-w-4xl mx-auto shadow">
      {visibleSections.map(section => renderSection(section))}
    </div>
  );
}
