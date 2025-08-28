import { TemplateProps } from './types';

export function MinimalistProfessionalTemplate({ data }: TemplateProps) {
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
    <div className="bg-white text-gray-800 max-w-3xl mx-auto" style={{ fontFamily: customization?.fontFamily }}>
      {/* Personal Info */}
      <div className="bg-white p-8">
        <div className="text-center">
          <h1
            className="text-3xl font-light tracking-wider text-gray-800 mb-2"
            style={{ fontFamily: customization?.fontFamily }}
          >
            {personalInfo?.fullName || 'Your Name'}
          </h1>
          <div className="w-16 h-0.5 bg-gray-400 mx-auto my-4"></div>
          <p className="text-sm text-gray-600 tracking-wider" style={{ fontFamily: customization?.fontFamily }}>
            {personalInfo?.title || 'Professional Title'}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-600">
            {personalInfo?.email && (
              <a href={`mailto:${personalInfo.email}`} className="hover:text-gray-900">
                {personalInfo.email}
              </a>
            )}
            {personalInfo?.phone && (
              <span>{personalInfo.phone}</span>
            )}
            {personalInfo?.location && (
              <span>{personalInfo.location}</span>
            )}
            {personalInfo?.website && (
              <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`}
                 target="_blank" rel="noopener noreferrer"
                 className="hover:text-gray-900">
                {formatUrl(personalInfo.website)}
              </a>
            )}
            {personalInfo?.linkedin && (
              <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`}
                 target="_blank" rel="noopener noreferrer"
                 className="hover:text-gray-900">
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="px-8 pb-6">
          <div className="border-t border-gray-200 pt-6">
            <h2
              className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-3"
              style={{ fontFamily: customization?.fontFamily }}
            >
              Profile
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: customization?.fontFamily }}>
              {summary}
            </p>
          </div>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="px-8 pb-6">
          <div className="border-t border-gray-200 pt-6">
            <h2
              className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-4"
              style={{ fontFamily: customization?.fontFamily }}
            >
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <h3 className="text-base font-medium text-gray-900" style={{ fontFamily: customization?.fontFamily }}>
                      {exp.jobTitle}
                    </h3>
                    <span className="text-xs text-gray-500 mt-0.5 sm:mt-0">
                      {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: customization?.fontFamily }}>
                    {exp.company}
                    {exp.location && ` • ${exp.location}`}
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
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="px-8 pb-6">
          <div className="border-t border-gray-200 pt-6">
            <h2
              className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-4"
              style={{ fontFamily: customization?.fontFamily }}
            >
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <h3 className="text-sm font-medium text-gray-900" style={{ fontFamily: customization?.fontFamily }}>
                      {edu.degree}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {edu.graduationDate ? formatDate(edu.graduationDate) : ''}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600" style={{ fontFamily: customization?.fontFamily }}>
                    {edu.school}
                    {edu.location && `, ${edu.location}`}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                  {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                    <div className="mt-1">
                      <p className="text-xs text-gray-600 mb-1">
                        Relevant Coursework:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {edu.relevantCourses.map((course, i) => (
                          <span 
                            key={i} 
                            className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-700"
                            style={{ fontFamily: customization?.fontFamily }}
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
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="px-8 pb-6">
          <div className="border-t border-gray-200 pt-6">
            <h2
              className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-4"
              style={{ fontFamily: customization?.fontFamily }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-xs px-2.5 py-1 border border-gray-300 rounded-full text-gray-700"
                  style={{ fontFamily: customization?.fontFamily }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="px-8 pb-6">
          <div className="border-t border-gray-200 pt-6">
            <h2
              className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-4"
              style={{ fontFamily: customization?.fontFamily }}
            >
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <h3 className="text-sm font-medium text-gray-900" style={{ fontFamily: customization?.fontFamily }}>
                      {project.name}
                      {project.url && (
                        <a
                          href={project.url.startsWith('http') ? project.url : `https://${project.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-1.5 text-xs font-normal text-gray-500 hover:text-gray-700"
                          style={{ fontFamily: customization?.fontFamily }}
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
                  <p className="text-sm text-gray-700 mt-0.5" style={{ fontFamily: customization?.fontFamily }}>
                    {project.description}
                  </p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-700"
                          style={{ fontFamily: customization?.fontFamily }}
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
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div className="px-8 pb-8">
          <div className="border-t border-gray-200 pt-6">
            <h2
              className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-4"
              style={{ fontFamily: customization?.fontFamily }}
            >
              Certifications
            </h2>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <h3 className="text-sm font-medium text-gray-900" style={{ fontFamily: customization?.fontFamily }}>
                    {cert.name}
                  </h3>
                  <p className="text-xs text-gray-600" style={{ fontFamily: customization?.fontFamily }}>
                    {cert.issuer}
                    {cert.date && ` • ${formatDate(cert.date)}`}
                    {cert.expirationDate && ` - ${formatDate(cert.expirationDate)}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Publications */}
      {publications && publications.length > 0 && (
        <div className="px-8 pb-8">
          <div className="border-t border-gray-200 pt-6">
            <h2
              className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-4"
              style={{ fontFamily: customization?.fontFamily }}
            >
              Publications
            </h2>
            <div className="space-y-4">
              {publications.map((pub) => (
                <div key={pub.id}>
                  <h3 className="text-sm font-medium text-gray-900" style={{ fontFamily: customization?.fontFamily }}>
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
        </div>
      )}
    </div>
  );
}
