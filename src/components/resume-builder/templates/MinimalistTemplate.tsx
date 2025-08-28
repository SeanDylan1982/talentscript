import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { TemplateProps } from './types';

export function MinimalistTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, publications, customization } = data || {};
  
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const formatUrl = (url: string) => {
    if (!url) return '';
    return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  };

  return (
    <div className="p-8 bg-white text-gray-800 max-w-3xl mx-auto" style={{ fontFamily: customization?.fontFamily }}>
      {/* Personal Info */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-light tracking-wider mb-1"
            style={{ color: '#2c3e50', fontFamily: customization?.fontFamily }}>
          {personalInfo?.fullName || 'Your Name'}
        </h1>
        {personalInfo?.title && (
          <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: customization?.fontFamily }}>
            {personalInfo.title}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-500">
          {personalInfo?.email && (
            <div className="flex items-center">
              <Mail className="w-3 h-3 mr-1" style={{ color: customization?.accentColor }} />
              {personalInfo.email}
            </div>
          )}
          {personalInfo?.phone && (
            <div className="flex items-center">
              <Phone className="w-3 h-3 mr-1" style={{ color: customization?.accentColor }} />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo?.location && (
            <div className="flex items-center">
              <MapPin className="w-3 h-3 mr-1" style={{ color: customization?.accentColor }} />
              {personalInfo.location}
            </div>
          )}
          {personalInfo?.website && (
            <div className="flex items-center">
              <Globe className="w-3 h-3 mr-1" style={{ color: customization?.accentColor }} />
              {formatUrl(personalInfo.website)}
            </div>
          )}
          {personalInfo?.linkedin && (
            <div className="flex items-center">
              <Linkedin className="w-3 h-3 mr-1" style={{ color: customization?.accentColor }} />
              {formatUrl(personalInfo.linkedin)}
            </div>
          )}
          {personalInfo?.github && (
            <div className="flex items-center">
              <Github className="w-3 h-3 mr-1" style={{ color: customization?.accentColor }} />
              {formatUrl(personalInfo.github)}
            </div>
          )}
        </div>
        <div className="h-px bg-gray-200 my-6"></div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-8">
          <h2 className="text-sm font-normal uppercase tracking-widest mb-3"
              style={{ color: customization?.accentColor, fontFamily: customization?.fontFamily, letterSpacing: '0.15em' }}>
            About
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: customization?.fontFamily }}>
            {summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-normal uppercase tracking-widest mb-4"
              style={{ color: customization?.accentColor, fontFamily: customization?.fontFamily, letterSpacing: '0.15em' }}>
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-medium" style={{ color: '#2c3e50', fontFamily: customization?.fontFamily }}>
                    {exp.jobTitle}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: customization?.fontFamily }}>
                  {exp.company}{exp.location && ` • ${exp.location}`}
                </p>
                <ul className="space-y-1.5">
                  {exp.description.filter(desc => desc.trim()).map((desc, index) => (
                    <li key={index} className="text-sm text-gray-700 flex" style={{ fontFamily: customization?.fontFamily }}>
                      <span className="text-gray-400 mr-2">•</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-normal uppercase tracking-widest mb-4"
              style={{ color: customization?.accentColor, fontFamily: customization?.fontFamily, letterSpacing: '0.15em' }}>
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-medium" style={{ color: '#2c3e50', fontFamily: customization?.fontFamily }}>
                    {edu.degree}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {edu.graduationDate ? formatDate(edu.graduationDate) : ''}
                  </span>
                </div>
                <p className="text-sm text-gray-600" style={{ fontFamily: customization?.fontFamily }}>
                  {edu.school}{edu.location && ` • ${edu.location}`}
                </p>
                {edu.gpa && (
                  <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: customization?.fontFamily }}>
                    GPA: {edu.gpa}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-normal uppercase tracking-widest mb-4"
              style={{ color: customization?.accentColor, fontFamily: customization?.fontFamily, letterSpacing: '0.15em' }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-700"
                style={{ fontFamily: customization?.fontFamily }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-normal uppercase tracking-widest mb-4"
              style={{ color: customization?.accentColor, fontFamily: customization?.fontFamily, letterSpacing: '0.15em' }}>
            Certifications
          </h2>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="text-sm font-medium" style={{ color: '#2c3e50', fontFamily: customization?.fontFamily }}>
                  {cert.name}
                </h3>
                <p className="text-xs text-gray-600" style={{ fontFamily: customization?.fontFamily }}>
                  {cert.issuer}
                  {cert.date && ` • ${formatDate(cert.date)}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-normal uppercase tracking-widest mb-4"
              style={{ color: customization?.accentColor, fontFamily: customization?.fontFamily, letterSpacing: '0.15em' }}>
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-medium" style={{ color: '#2c3e50', fontFamily: customization?.fontFamily }}>
                    {project.name}
                  </h3>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline"
                      style={{ color: customization?.accentColor }}
                    >
                      View Project
                    </a>
                  )}
                </div>
                {project.technologies && project.technologies.length > 0 && (
                  <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: customization?.fontFamily }}>
                    {project.technologies.join(' • ')}
                  </p>
                )}
                <p className="text-sm text-gray-700" style={{ fontFamily: customization?.fontFamily }}>
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Publications */}
      {publications && publications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-normal uppercase tracking-widest mb-4"
              style={{ color: customization?.accentColor, fontFamily: customization?.fontFamily, letterSpacing: '0.15em' }}>
            Publications
          </h2>
          <div className="space-y-4">
            {publications.map((pub) => (
              <div key={pub.id}>
                <h3 className="text-sm font-medium" style={{ color: '#2c3e50', fontFamily: customization?.fontFamily }}>
                  {pub.title}
                </h3>
                <p className="text-xs text-gray-600" style={{ fontFamily: customization?.fontFamily }}>
                  {pub.journal}
                  {pub.publicationDate && ` • ${formatDate(pub.publicationDate)}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
