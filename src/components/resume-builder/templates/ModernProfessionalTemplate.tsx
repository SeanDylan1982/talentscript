import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Briefcase, GraduationCap, Code, Award, User, BookOpen } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export function ModernProfessionalTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, sections, customization } = data;
  
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
          <div key={section.id} className="bg-white p-8 border-b border-gray-200">
            <div className="flex flex-col items-center text-center">
              <h1 
                className="text-3xl font-bold text-gray-900 mb-2" 
                style={{ 
                  fontFamily: customization.fontFamily,
                  color: customization.accentColor 
                }}
              >
                {personalInfo.fullName || 'Your Name'}
              </h1>
              <p className="text-lg text-gray-700 mb-4" style={{ fontFamily: customization.fontFamily }}>
                {personalInfo.title || 'Professional Title'}
              </p>
              
              <div className="w-24 h-1 bg-gray-300 my-4"></div>
              
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
                {personalInfo.email && (
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center hover:text-gray-900">
                    <Mail className="w-4 h-4 mr-1.5" />
                    {personalInfo.email}
                  </a>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-1.5" />
                    {personalInfo.phone}
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1.5" />
                    {personalInfo.location}
                  </div>
                )}
                {personalInfo.website && (
                  <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} 
                     target="_blank" rel="noopener noreferrer" 
                     className="flex items-center hover:text-gray-900">
                    <Globe className="w-4 h-4 mr-1.5" />
                    Website
                  </a>
                )}
                {personalInfo.linkedin && (
                  <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} 
                     target="_blank" rel="noopener noreferrer" 
                     className="flex items-center hover:text-gray-900">
                    <Linkedin className="w-4 h-4 mr-1.5" />
                    LinkedIn
                  </a>
                )}
                {personalInfo.github && (
                  <a href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} 
                     target="_blank" rel="noopener noreferrer" 
                     className="flex items-center hover:text-gray-900">
                    <Github className="w-4 h-4 mr-1.5" />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        );

      case 'summary':
        if (!summary) return null;
        return (
          <div key={section.id} className="p-8 border-b border-gray-200">
            <h2 
              className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 flex items-center"
              style={{ 
                fontFamily: customization.fontFamily,
                color: customization.accentColor
              }}
            >
              <User className="w-4 h-4 mr-2" />
              Professional Profile
            </h2>
            <p className="text-gray-700 leading-relaxed" style={{ fontFamily: customization.fontFamily }}>
              {summary}
            </p>
          </div>
        );

      case 'experience':
        if (experience.length === 0) return null;
        return (
          <div key={section.id} className="p-8 border-b border-gray-200">
            <h2 
              className="text-lg font-semibold mb-6 pb-2 border-b border-gray-200 flex items-center"
              style={{ 
                fontFamily: customization.fontFamily,
                color: customization.accentColor
              }}
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                        {exp.jobTitle}
                      </h3>
                      <p className="text-gray-700" style={{ fontFamily: customization.fontFamily }}>
                        {exp.company}
                        {exp.location && ` • ${exp.location}`}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 mt-0.5 sm:mt-0">
                      {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-2 pl-1">
                    {exp.description.filter(desc => desc.trim()).map((desc, index) => (
                      <li key={index} className="text-gray-700 flex" style={{ fontFamily: customization.fontFamily }}>
                        <span className="text-gray-400 mr-2">•</span>
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
          <div key={section.id} className="p-8 border-b border-gray-200">
            <h2 
              className="text-lg font-semibold mb-6 pb-2 border-b border-gray-200 flex items-center"
              style={{ 
                fontFamily: customization.fontFamily,
                color: customization.accentColor
              }}
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              Education
            </h2>
            <div className="space-y-5">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                        {edu.degree}
                      </h3>
                      <p className="text-gray-700" style={{ fontFamily: customization.fontFamily }}>
                        {edu.school}
                        {edu.location && `, ${edu.location}`}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 mt-0.5 sm:mt-0">
                      {formatDate(edu.graduationDate)}
                    </span>
                  </div>
                  {edu.gpa && (
                    <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: customization.fontFamily }}>
                      <span className="font-medium">GPA:</span> {edu.gpa}
                    </p>
                  )}
                  {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: customization.fontFamily }}>
                        Relevant Coursework:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.relevantCourses.map((course, i) => (
                          <span 
                            key={i} 
                            className="text-xs px-2.5 py-0.5 bg-gray-100 rounded-full text-gray-700"
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
          <div key={section.id} className="p-8 border-b border-gray-200">
            <h2 
              className="text-lg font-semibold mb-6 pb-2 border-b border-gray-200 flex items-center"
              style={{ 
                fontFamily: customization.fontFamily,
                color: customization.accentColor
              }}
            >
              <Code className="w-4 h-4 mr-2" />
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
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

      case 'projects':
        if (projects.length === 0) return null;
        return (
          <div key={section.id} className="p-8 border-b border-gray-200">
            <h2 
              className="text-lg font-semibold mb-6 pb-2 border-b border-gray-200 flex items-center"
              style={{ 
                fontFamily: customization.fontFamily,
                color: customization.accentColor
              }}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Projects
            </h2>
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.id} className="break-inside-avoid">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <h3 className="text-base font-semibold text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                      {project.name}
                      {project.url && (
                        <a 
                          href={project.url.startsWith('http') ? project.url : `https://${project.url}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="ml-2 text-sm font-normal text-blue-600 hover:underline"
                          style={{ fontFamily: customization.fontFamily }}
                        >
                          (View Project)
                        </a>
                      )}
                    </h3>
                    {project.startDate && (
                      <span className="text-sm text-gray-500 mt-0.5 sm:mt-0">
                        {formatDate(project.startDate)}
                        {project.endDate ? ` - ${formatDate(project.endDate)}` : ' - Present'}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 mt-1" style={{ fontFamily: customization.fontFamily }}>
                    {project.description}
                  </p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech, i) => (
                          <span 
                            key={i} 
                            className="text-xs px-2.5 py-0.5 bg-gray-100 rounded-full text-gray-700"
                            style={{ fontFamily: customization.fontFamily }}
                          >
                            {tech}
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

      case 'certifications':
        if (certifications.length === 0) return null;
        return (
          <div key={section.id} className="p-8 border-b border-gray-200">
            <h2 
              className="text-lg font-semibold mb-6 pb-2 border-b border-gray-200 flex items-center"
              style={{ 
                fontFamily: customization.fontFamily,
                color: customization.accentColor
              }}
            >
              <Award className="w-4 h-4 mr-2" />
              Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-base font-semibold text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                    {cert.name}
                  </h3>
                  <p className="text-sm text-gray-700 mt-0.5" style={{ fontFamily: customization.fontFamily }}>
                    {cert.issuer}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
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
    <div className="bg-white text-gray-800 max-w-4xl mx-auto shadow-lg overflow-hidden">
      {visibleSections.map(section => renderSection(section))}
    </div>
  );
}
