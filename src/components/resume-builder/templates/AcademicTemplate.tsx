import { Mail, Phone, MapPin, Globe, Linkedin, Github, Book, GraduationCap, Award, Briefcase, FileText } from 'lucide-react';
import { TemplateProps } from './types';

export function AcademicTemplate({ data }: TemplateProps) {
  // Destructure with default values to prevent undefined errors
  const { 
    personalInfo,
    summary,
    experience,
    education,
    skills,
    certifications,
    projects,
    publications,
    customization
  } = data || {};
  
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white text-gray-800 p-8 max-w-4xl mx-auto">
      {/* Personal Info */}
      <div className="bg-white p-6 border-b border-gray-200">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: customization?.fontFamily }}>
            {personalInfo?.fullName || 'Your Name'}
          </h1>
          <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: customization?.fontFamily }}>
            {personalInfo?.title || 'Researcher / Academic'}
          </p>

          <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-600">
            {personalInfo?.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center hover:text-gray-900">
                <Mail className="w-3.5 h-3.5 mr-1.5" />
                {personalInfo.email}
              </a>
            )}
            {personalInfo?.phone && (
              <div className="flex items-center">
                <Phone className="w-3.5 h-3.5 mr-1.5" />
                {personalInfo.phone}
              </div>
            )}
            {personalInfo?.location && (
              <div className="flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1.5" />
                {personalInfo.location}
              </div>
            )}
            {personalInfo?.website && (
              <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`}
                 target="_blank" rel="noopener noreferrer"
                 className="flex items-center hover:text-gray-900">
                <Globe className="w-3.5 h-3.5 mr-1.5" />
                Personal Website
              </a>
            )}
            {personalInfo?.linkedin && (
              <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`}
                 target="_blank" rel="noopener noreferrer"
                 className="flex items-center hover:text-gray-900">
                <Linkedin className="w-3.5 h-3.5 mr-1.5" />
                LinkedIn
              </a>
            )}
            {personalInfo?.github && (
              <a href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`}
                 target="_blank" rel="noopener noreferrer"
                 className="flex items-center hover:text-gray-900">
                <Github className="w-3.5 h-3.5 mr-1.5" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-base font-semibold mb-3 flex items-center text-gray-800" style={{ fontFamily: customization?.fontFamily }}>
            <FileText className="w-4 h-4 mr-2" style={{ color: customization?.accentColor }} />
            Research Profile
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: customization?.fontFamily }}>
            {summary}
          </p>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-base font-semibold mb-4 flex items-center text-gray-800" style={{ fontFamily: customization?.fontFamily }}>
            <GraduationCap className="w-4 h-4 mr-2" style={{ color: customization?.accentColor }} />
            Education
          </h2>
          <div className="space-y-5">
            {education.map((edu) => (
              <div key={edu.id} className="break-inside-avoid">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-gray-600 mr-2">
                    <Book className="h-5 w-5" style={{ color: customization?.accentColor }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: customization?.fontFamily }}>
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-gray-700" style={{ fontFamily: customization?.fontFamily }}>
                      {edu.school}
                    </p>
                  </div>
                </div>
                {edu.gpa && (
                  <p className="text-xs text-gray-600 mt-1" style={{ fontFamily: customization?.fontFamily }}>
                    <span className="font-medium">GPA:</span> {edu.gpa}
                  </p>
                )}
                {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-medium text-gray-700 mb-1" style={{ fontFamily: customization?.fontFamily }}>
                      Relevant Coursework:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.relevantCourses.map((course, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-700"
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
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-base font-semibold mb-4 flex items-center text-gray-800" style={{ fontFamily: customization?.fontFamily }}>
            <Briefcase className="w-4 h-4 mr-2" style={{ color: customization?.accentColor }} />
            {experience.some(exp => exp.company.toLowerCase().includes('research') ||
                                   exp.jobTitle.toLowerCase().includes('research'))
              ? 'Research Experience'
              : 'Professional Experience'}
          </h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id} className="break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: customization?.fontFamily }}>
                      {exp.jobTitle}
                    </h3>
                    <p className="text-sm text-gray-700" style={{ fontFamily: customization?.fontFamily }}>
                      {exp.company}
                      {exp.location && ` • ${exp.location}`}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 mt-0.5 sm:mt-0">
                    {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <ul className="mt-2 space-y-1.5 pl-1">
                  {exp.description.filter(desc => desc.trim()).map((desc, index) => (
                    <li key={index} className="text-sm text-gray-700 flex" style={{ fontFamily: customization?.fontFamily }}>
                      <span className="text-gray-400 mr-1.5">•</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Publications */}
      {publications && publications.length > 0 && (
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-base font-semibold mb-4 flex items-center text-gray-800" style={{ fontFamily: customization?.fontFamily }}>
            <Book className="w-4 h-4 mr-2" style={{ color: customization?.accentColor }} />
            Publications
          </h2>
          <div className="space-y-4">
            {publications.map((pub) => (
              <div key={pub.id} className="break-inside-avoid">
                <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: customization?.fontFamily }}>
                  {pub.title}
                </h3>
                <p className="text-xs text-gray-600 mt-1" style={{ fontFamily: customization?.fontFamily }}>
                  {pub.authors.join(', ')} ({formatDate(pub.publicationDate)})
                </p>
                <p className="text-xs text-gray-600" style={{ fontFamily: customization?.fontFamily }}>
                  <i>{pub.journal}</i>
                </p>
                {pub.doi && (
                   <p className="text-xs text-gray-600" style={{ fontFamily: customization?.fontFamily }}>
                    DOI: {pub.doi}
                  </p>
                )}
                {pub.url && (
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                    style={{ fontFamily: customization?.fontFamily }}
                  >
                    View Publication
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-base font-semibold mb-4 flex items-center text-gray-800" style={{ fontFamily: customization?.fontFamily }}>
            <Book className="w-4 h-4 mr-2" style={{ color: customization?.accentColor }} />
            Research Projects
          </h2>
          <div className="space-y-5">
            {projects.map((project) => (
              <div key={project.id} className="break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: customization?.fontFamily }}>
                    {project.name}
                    {project.url && (
                      <a
                        href={project.url.startsWith('http') ? project.url : `https://${project.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1.5 text-xs font-normal text-blue-600 hover:underline"
                        style={{ fontFamily: customization?.fontFamily }}
                      >
                        (View Project)
                      </a>
                    )}
                  </h3>
                  {project.startDate && (
                    <span className="text-xs text-gray-500 mt-0.5 sm:mt-0">
                      {formatDate(project.startDate)}
                      {project.endDate ? ` - ${formatDate(project.endDate)}` : ' - Present'}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-700 mt-1" style={{ fontFamily: customization?.fontFamily }}>
                  {project.description}
                </p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-medium text-gray-700 mb-1" style={{ fontFamily: customization?.fontFamily }}>
                      Technologies:
                    </p>
                    <p className="text-xs text-gray-600" style={{ fontFamily: customization?.fontFamily }}>
                      {project.technologies.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-base font-semibold mb-4 flex items-center text-gray-800" style={{ fontFamily: customization?.fontFamily }}>
            <Award className="w-4 h-4 mr-2" style={{ color: customization?.accentColor }} />
            Certifications & Training
          </h2>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: customization?.fontFamily }}>
                  {cert.name}
                </h3>
                <p className="text-xs text-gray-700" style={{ fontFamily: customization?.fontFamily }}>
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
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-base font-semibold mb-4 flex items-center text-gray-800" style={{ fontFamily: customization?.fontFamily }}>
            <Book className="w-4 h-4 mr-2" style={{ color: customization?.accentColor }} />
            Research Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill) => (
              <div key={skill.id} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-800" style={{ fontFamily: customization?.fontFamily }}>
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
                      backgroundColor: customization?.accentColor
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
