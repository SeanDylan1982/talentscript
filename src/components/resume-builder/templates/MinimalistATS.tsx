import { TemplateProps } from './types';

export function MinimalistATS({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, publications, customization } = data || {};
  
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="bg-white text-gray-800 max-w-4xl mx-auto p-6" style={{ fontFamily: customization?.fontFamily }}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{personalInfo?.fullName}</h1>
        {personalInfo?.title && <p className="text-sm text-gray-600">{personalInfo.title}</p>}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs mt-2 text-gray-600">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
          {personalInfo?.location && <span>{personalInfo.location}</span>}
          {personalInfo?.linkedin && <span>linkedin.com/in/username</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-900 mb-2 border-b pb-1">SUMMARY</h2>
          <p className="text-sm text-gray-700">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-900 mb-3 border-b pb-1">EXPERIENCE</h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="text-base font-semibold">{exp.jobTitle}</h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-sm text-gray-700">
                  {exp.company}
                  {exp.location && ` • ${exp.location}`}
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  {exp.description.map((desc, idx) => (
                    <li key={idx} className="flex">
                      <span className="mr-2">•</span>
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
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-900 mb-3 border-b pb-1">EDUCATION</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="text-sm font-semibold">{edu.degree}</h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(edu.graduationDate)}
                  </span>
                </div>
                <p className="text-sm text-gray-700">
                  {edu.school}
                  {edu.location && `, ${edu.location}`}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-900 mb-3 border-b pb-1">SKILLS</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill.id} className="text-xs bg-gray-100 text-gray-800 px-2.5 py-1 rounded-full">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-900 mb-3 border-b pb-1">CERTIFICATIONS</h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="text-sm font-medium">{cert.name}</h3>
                <p className="text-xs text-gray-600">
                  {cert.issuer} • {formatDate(cert.date)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-900 mb-3 border-b pb-1">PROJECTS</h2>
          <div className="space-y-5">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="text-base font-semibold">{project.name}</h3>
                <p className="text-sm text-gray-700 mt-1">{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <p className="text-xs text-gray-600 mt-1">
                    Technologies: {project.technologies.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Publications */}
      {publications && publications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-900 mb-3 border-b pb-1">PUBLICATIONS</h2>
          <div className="space-y-2">
            {publications.map((pub) => (
              <div key={pub.id}>
                <h3 className="text-sm font-medium">{pub.title}</h3>
                <p className="text-xs text-gray-600">
                  {pub.journal} • {formatDate(pub.publicationDate)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
