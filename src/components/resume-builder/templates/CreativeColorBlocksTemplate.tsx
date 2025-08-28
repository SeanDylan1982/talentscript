import { Briefcase, GraduationCap, User, Code, Mail, Phone, MapPin, Globe, Award } from 'lucide-react';
import { TemplateProps } from './types';

export function CreativeColorBlocksTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, publications } = data || {};

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // Color variants for different sections
  const colorVariants = {
    primary: 'bg-blue-600 text-white',
    secondary: 'bg-blue-100 text-blue-900',
    accent: 'bg-yellow-400 text-gray-900',
    light: 'bg-gray-50 text-gray-800',
    dark: 'bg-gray-800 text-white',
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with color block */}
      <div className={`${colorVariants.primary} p-8`}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            {personalInfo?.profileImage && (
              <div className="w-32 h-32 rounded-full bg-white p-1 mb-6 md:mb-0 md:mr-8 overflow-hidden">
                <img 
                  src={personalInfo.profileImage} 
                  alt={personalInfo.fullName || 'Profile'}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            )}
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">{personalInfo?.fullName || 'Your Name'}</h1>
              <p className="text-xl text-blue-100">{personalInfo?.title || 'Professional Title'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Contact */}
            <div className={`${colorVariants.secondary} p-6 rounded-lg`}>
              <h2 className="text-xl font-bold mb-4">CONTACT</h2>
              <div className="space-y-3">
                {personalInfo?.email && (
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo?.phone && (
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo?.location && (
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{personalInfo.location}</span>
                  </div>
                )}
                {personalInfo?.website && (
                  <div className="flex items-start">
                    <Globe className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                    <a href={personalInfo.website} className="text-sm hover:underline">
                      {personalInfo.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            {skills.length > 0 && (
              <div className={`${colorVariants.light} p-6 rounded-lg`}>
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Code className="w-5 h-5 mr-2 text-blue-600" />
                  SKILLS
                </h2>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-gray-500">{skill.level}</span>
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

            {/* Education */}
            {education && education.length > 0 && (
              <div className={`${colorVariants.secondary} p-6 rounded-lg`}>
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  EDUCATION
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-semibold text-blue-900">{edu.degree}</h3>
                      <p className="text-sm">
                        {edu.school}
                        {edu.location && `, ${edu.location}`}
                      </p>
                      {edu.graduationDate && (
                        <p className="text-xs text-blue-700">
                          {formatDate(edu.graduationDate)}
                          {edu.gpa && ` • GPA: ${edu.gpa}`}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
              <div className={`${colorVariants.light} p-6 rounded-lg`}>
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-blue-600" />
                  CERTIFICATIONS
                </h2>
                <div className="space-y-3">
                  {certifications.map((cert) => (
                    <div key={cert.id}>
                      <h3 className="font-medium text-sm">{cert.name}</h3>
                      <p className="text-sm text-gray-600">{cert.issuer}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(cert.date)}
                        {cert.expirationDate && ` • Expires: ${formatDate(cert.expirationDate)}`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summary */}
            {summary && (
              <div className={`${colorVariants.light} p-6 rounded-lg`}>
                <h2 className="text-xl font-bold mb-3 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  ABOUT ME
                </h2>
                <p className="text-gray-700">{summary}</p>
              </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <div className={`${colorVariants.light} p-6 rounded-lg`}>
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                  EXPERIENCE
                </h2>
                <div className="space-y-6">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                        <h3 className="text-lg font-semibold text-gray-900">{exp.jobTitle}</h3>
                        <span className="text-sm text-blue-600 font-medium">
                          {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {exp.company}
                        {exp.location && ` • ${exp.location}`}
                      </p>
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
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

            {/* Projects */}
            {projects && projects.length > 0 && (
              <div className={`${colorVariants.light} p-6 rounded-lg`}>
                <h2 className="text-xl font-bold mb-4">PROJECTS</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((project) => (
                    <div key={project.id} className="border-l-4 border-blue-500 pl-4 py-1">
                      <h3 className="font-semibold">{project.name}</h3>
                      {project.url && (
                        <a 
                          href={project.url} 
                          className="text-sm text-blue-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.url.replace(/^https?:\/\//, '')}
                        </a>
                      )}
                      <p className="text-sm text-gray-700 mt-1">{project.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Publications */}
            {publications && publications.length > 0 && (
              <div className={`${colorVariants.light} p-6 rounded-lg`}>
                <h2 className="text-xl font-bold mb-4">PUBLICATIONS</h2>
                <div className="space-y-4">
                  {publications.map((pub) => (
                    <div key={pub.id} className="border-l-4 border-blue-500 pl-4 py-1">
                      <h3 className="font-semibold">{pub.title}</h3>
                      <p className="text-sm text-gray-700">
                        {pub.journal}
                        {pub.publicationDate && ` • ${formatDate(pub.publicationDate)}`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
