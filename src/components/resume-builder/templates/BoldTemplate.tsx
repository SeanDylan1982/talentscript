import { Mail, Phone, MapPin, Globe, Linkedin, Github, Briefcase, GraduationCap, Code, Award, User } from 'lucide-react';
import { TemplateProps } from './types';

export function BoldTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects } = data || {};

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
    <div className="bg-white text-gray-800 max-w-4xl mx-auto shadow-lg">
      {/* Personal Info & Summary */}
      <div className="bg-gray-900 text-white p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-sans)' }}>
              {personalInfo?.fullName || 'Your Name'}
            </h1>
            <p className="text-blue-300 mt-1">
              {personalInfo?.title || 'Professional Title'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {personalInfo?.email && (
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-blue-300" />
                <span className="text-gray-300">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo?.phone && (
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-blue-300" />
                <span className="text-gray-300">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo?.location && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-blue-300" />
                <span className="text-gray-300">{personalInfo.location}</span>
              </div>
            )}
            {personalInfo?.website && (
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2 text-blue-300" />
                <span className="text-gray-300">{formatUrl(personalInfo.website)}</span>
              </div>
            )}
            {personalInfo?.linkedin && (
              <div className="flex items-center">
                <Linkedin className="w-4 h-4 mr-2 text-blue-300" />
                <span className="text-gray-300">linkedin.com/in/...</span>
              </div>
            )}
            {personalInfo?.github && (
              <div className="flex items-center">
                <Github className="w-4 h-4 mr-2 text-blue-300" />
                <span className="text-gray-300">github.com/...</span>
              </div>
            )}
          </div>
        </div>

        {summary && (
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h2 className="text-xl font-bold mb-3 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-300" />
              PROFILE
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {summary}
            </p>
          </div>
        )}
      </div>

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="p-8">
          <h2 className="text-xl font-bold mb-6 flex items-center text-gray-800">
            <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
            EXPERIENCE
          </h2>
          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l-4 border-blue-600 pl-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="text-lg font-bold text-gray-900">
                    {exp.jobTitle}
                  </h3>
                  <span className="text-sm font-medium text-blue-600">
                    {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-600 mb-3">
                  {exp.company}
                  {exp.location && ` • ${exp.location}`}
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  {exp.description.filter(desc => desc.trim()).map((desc, index) => (
                    <li key={index} className="flex">
                      <span className="text-blue-600 mr-2">•</span>
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
        <div className="p-8 bg-gray-50">
          <h2 className="text-xl font-bold mb-6 flex items-center text-gray-800">
            <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
            EDUCATION
          </h2>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="border-l-4 border-blue-600 pl-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="text-lg font-bold text-gray-900">
                    {edu.degree}
                  </h3>
                  <span className="text-sm font-medium text-blue-600">
                    {edu.graduationDate ? formatDate(edu.graduationDate) : ''}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-600">
                  {edu.school}
                  {edu.location && `, ${edu.location}`}
                </p>
                {edu.gpa && (
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-medium">GPA:</span> {edu.gpa}
                  </p>
                )}
                {edu.achievements && edu.achievements.length > 0 && (
                  <ul className="mt-2 space-y-1 text-sm text-gray-700">
                    {edu.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="p-8">
          <h2 className="text-xl font-bold mb-6 flex items-center text-gray-800">
            <Code className="w-5 h-5 mr-2 text-blue-600" />
            SKILLS & EXPERTISE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <div key={skill.id}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-800">
                    {skill.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {skill.level}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-blue-600"
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
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="p-8 bg-gray-50">
          <h2 className="text-xl font-bold mb-6 flex items-center text-gray-800">
            <Code className="w-5 h-5 mr-2 text-blue-600" />
            PROJECTS
          </h2>
          <div className="space-y-8">
            {projects.map((project) => (
              <div key={project.id} className="border-l-4 border-blue-600 pl-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="text-lg font-bold text-gray-900">
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
                    <span className="text-sm font-medium text-blue-600">
                      {formatDate(project.startDate)}
                      {project.endDate ? ` - ${formatDate(project.endDate)}` : ' - Present'}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-700 mt-1">
                  {project.description}
                </p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium"
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
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div className="p-8">
          <h2 className="text-xl font-bold mb-6 flex items-center text-gray-800">
            <Award className="w-5 h-5 mr-2 text-blue-600" />
            CERTIFICATIONS
          </h2>
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-base font-bold text-gray-900">
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
      )}
    </div>
  );
}
