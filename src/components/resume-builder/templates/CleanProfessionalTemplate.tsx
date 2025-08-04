import { Mail, Phone, MapPin, Globe, Linkedin, Github, Briefcase, GraduationCap, Code, Award } from 'lucide-react';
import { TemplateProps } from './types';

export function CleanProfessionalTemplate({ data }: TemplateProps) {
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
          <div key={section.id} className="bg-white p-8">
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-gray-900 mb-2" style={{ fontFamily: customization.fontFamily }}>
                {personalInfo.fullName}
              </h1>
              {personalInfo.title && (
                <p className="text-lg text-gray-600 mb-4" style={{ fontFamily: customization.fontFamily }}>
                  {personalInfo.title}
                </p>
              )}
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                {personalInfo.email && (
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center hover:text-blue-600">
                    <Mail className="w-4 h-4 mr-1" />
                    {personalInfo.email}
                  </a>
                )}
                {personalInfo.phone && (
                  <a href={`tel:${personalInfo.phone}`} className="flex items-center hover:text-blue-600">
                    <Phone className="w-4 h-4 mr-1" />
                    {personalInfo.phone}
                  </a>
                )}
                {personalInfo.location && (
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {personalInfo.location}
                  </span>
                )}
                {personalInfo.website && (
                  <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-600">
                    <Globe className="w-4 h-4 mr-1" />
                    {personalInfo.website.replace(/^https?:\/\//, '')}
                  </a>
                )}
              </div>
            </div>
          </div>
        );

      case 'summary':
        if (!summary) return null;
        return (
          <div key={section.id} className="px-8 py-4">
            <h2 className="text-lg font-semibold mb-2 text-gray-800" style={{ fontFamily: customization.fontFamily }}>
              Professional Summary
            </h2>
            <p className="text-gray-700 text-sm" style={{ fontFamily: customization.fontFamily }}>{summary}</p>
          </div>
        );

      case 'experience':
        if (experience.length === 0) return null;
        return (
          <div key={section.id} className="px-8 py-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center" style={{ fontFamily: customization.fontFamily }}>
              <Briefcase className="w-5 h-5 mr-2" style={{ color: customization.accentColor }} />
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
                      <p className="text-sm text-gray-700" style={{ fontFamily: customization.fontFamily }}>
                        {exp.company} • {exp.location}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <ul className="mt-2 space-y-1 text-sm text-gray-700">
                    {exp.description.map((desc, idx) => (
                      <li key={idx} className="flex" style={{ fontFamily: customization.fontFamily }}>
                        <span className="mr-2">•</span>
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
          <div key={section.id} className="px-8 py-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center" style={{ fontFamily: customization.fontFamily }}>
              <GraduationCap className="w-5 h-5 mr-2" style={{ color: customization.accentColor }} />
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="text-base font-semibold text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-gray-700" style={{ fontFamily: customization.fontFamily }}>
                    {edu.school} • {edu.location}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(edu.graduationDate)}
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
          <div key={section.id} className="px-8 py-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center" style={{ fontFamily: customization.fontFamily }}>
              <Code className="w-5 h-5 mr-2" style={{ color: customization.accentColor }} />
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill) => (
                <div key={skill.id} className="text-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span style={{ fontFamily: customization.fontFamily }}>{skill.name}</span>
                    <span className="text-xs text-gray-500">{skill.level}</span>
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
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'certifications':
        if (certifications.length === 0) return null;
        return (
          <div key={section.id} className="px-8 py-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center" style={{ fontFamily: customization.fontFamily }}>
              <Award className="w-5 h-5 mr-2" style={{ color: customization.accentColor }} />
              Certifications
            </h2>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <h3 className="text-sm font-medium text-gray-900" style={{ fontFamily: customization.fontFamily }}>
                    {cert.name}
                  </h3>
                  <p className="text-xs text-gray-600" style={{ fontFamily: customization.fontFamily }}>
                    {cert.issuer} • {formatDate(cert.date)}
                    {cert.expirationDate && ` • Expires: ${formatDate(cert.expirationDate)}`}
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
    <div className="bg-white text-gray-800 max-w-4xl mx-auto shadow-lg overflow-hidden" style={{ fontFamily: customization.fontFamily }}>
      {visibleSections.map((section) => renderSection(section))}
    </div>
  );
}
