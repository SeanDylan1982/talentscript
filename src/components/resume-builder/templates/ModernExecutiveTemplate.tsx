import { Mail, Phone, MapPin, Linkedin, Globe, Briefcase, GraduationCap, Star, BookOpen } from 'lucide-react';
import { TemplateProps } from './types';

export function ModernExecutiveTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, publications, customization } = data || {};
  const accentColor = customization?.accentColor || '#2563eb';
  
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white" style={{ fontFamily: customization?.fontFamily }}>
      {/* Sidebar */}
      <div className="w-full md:w-1/3 bg-gray-50 p-8">
        {/* Profile Image */}
        {personalInfo?.profileImage && (
          <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-white shadow-md">
            <img 
              src={personalInfo.profileImage} 
              alt={personalInfo.fullName}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {/* Contact */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Contact
          </h2>
          <ul className="space-y-2">
            {personalInfo?.email && (
              <li className="flex items-center text-gray-700">
                <Mail className="w-4 h-4 mr-2 text-gray-500" />
                <span>{personalInfo.email}</span>
              </li>
            )}
            {personalInfo?.phone && (
              <li className="flex items-center text-gray-700">
                <Phone className="w-4 h-4 mr-2 text-gray-500" />
                <span>{personalInfo.phone}</span>
              </li>
            )}
            {personalInfo?.location && (
              <li className="flex items-center text-gray-700">
                <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                <span>{personalInfo.location}</span>
              </li>
            )}
            {personalInfo?.linkedin && (
              <li className="flex items-center text-gray-700">
                <Linkedin className="w-4 h-4 mr-2 text-gray-500" />
                <span>LinkedIn</span>
              </li>
            )}
            {personalInfo?.website && (
              <li className="flex items-center text-gray-700">
                <Globe className="w-4 h-4 mr-2 text-gray-500" />
                <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
              </li>
            )}
          </ul>
        </div>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              Skills
            </h2>
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-gray-500">{skill.level}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full" 
                      style={{ 
                        width: skill.level === 'Expert' ? '100%' : 
                               skill.level === 'Advanced' ? '80%' : 
                               skill.level === 'Intermediate' ? '60%' : '40%',
                        backgroundColor: accentColor
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              Certifications
            </h2>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.id} className="bg-white p-3 rounded-lg shadow-sm">
                  <h3 className="font-medium">{cert.name}</h3>
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

      {/* Main Content */}
      <div className="w-full md:w-2/3 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            {personalInfo?.fullName}
          </h1>
          {personalInfo?.title && (
            <p className="text-lg text-gray-600">
              {personalInfo.title}
            </p>
          )}
        </div>

        {/* Summary */}
        {summary && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
              <Briefcase className="w-5 h-5 mr-2" style={{ color: accentColor }} />
              Work Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l-2" style={{ borderLeftColor: accentColor }}>
                  <div className="absolute -left-1.5 top-0 w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                  <div className="mb-1">
                    <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                      <p className="text-gray-700">
                        {exp.company}
                        {exp.location && ` • ${exp.location}`}
                      </p>
                      <span className="text-sm text-gray-500">
                        {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                  </div>
                  <ul className="mt-2 space-y-1.5">
                    {exp.description.map((desc, idx) => (
                      <li key={idx} className="flex">
                        <span className="mr-2" style={{ color: accentColor }}>•</span>
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
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" style={{ color: accentColor }} />
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-6 border-l-2" style={{ borderLeftColor: accentColor }}>
                  <div className="absolute -left-1.5 top-0 w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-gray-700">
                    {edu.school}
                    {edu.location && `, ${edu.location}`}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{edu.fieldOfStudy}</span>
                    <span>{formatDate(edu.graduationDate)}</span>
                  </div>
                  {edu.gpa && (
                    <p className="text-sm text-gray-600">
                      GPA: {edu.gpa}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
              <Star className="w-5 h-5 mr-2" style={{ color: accentColor }} />
              Projects
            </h2>
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.id} className="relative pl-6 border-l-2" style={{ borderLeftColor: accentColor }}>
                  <div className="absolute -left-1.5 top-0 w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <p className="text-gray-700 mt-1">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Technologies:</strong> {project.technologies.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Publications */}
        {publications && publications.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
              <BookOpen className="w-5 h-5 mr-2" style={{ color: accentColor }} />
              Publications
            </h2>
            <div className="space-y-4">
              {publications.map((pub) => (
                <div key={pub.id} className="relative pl-6 border-l-2" style={{ borderLeftColor: accentColor }}>
                  <div className="absolute -left-1.5 top-0 w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                  <h3 className="font-semibold">{pub.title}</h3>
                  <p className="text-gray-700">
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
  );
}
