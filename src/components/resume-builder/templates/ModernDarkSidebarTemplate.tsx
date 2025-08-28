import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, User, BookOpen, Star } from 'lucide-react';
import { TemplateProps } from './types';

export function ModernDarkSidebarTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, publications } = data || {};

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const renderSidebar = () => (
    <div className="bg-gray-900 text-white p-8 w-full md:w-1/3">
      {personalInfo?.profileImage && (
        <div className="w-40 h-40 rounded-full bg-gray-800 mx-auto mb-8 overflow-hidden border-4 border-blue-500">
          <img 
            src={personalInfo.profileImage} 
            alt={personalInfo.fullName || 'Profile'}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-4 text-blue-400">CONTACT</h2>
          <div className="space-y-3 text-gray-300">
            {personalInfo?.email && (
              <div className="flex items-start">
                <Mail className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-blue-400" />
                <span className="text-sm">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo?.phone && (
              <div className="flex items-start">
                <Phone className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-blue-400" />
                <span className="text-sm">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo?.location && (
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-blue-400" />
                <span className="text-sm">{personalInfo.location}</span>
              </div>
            )}
            {personalInfo?.website && (
              <div className="flex items-start">
                <Globe className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-blue-400" />
                <a href={personalInfo.website} className="text-sm hover:text-blue-400 transition-colors">
                  {personalInfo.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
          </div>
        </div>

        {skills && skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-blue-400">SKILLS</h2>
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{skill.name}</span>
                    <span className="text-blue-400">
                      {skill.level === 'Expert' ? '★★★★★' : 
                       skill.level === 'Advanced' ? '★★★★☆' : 
                       skill.level === 'Intermediate' ? '★★★☆☆' : '★★☆☆☆'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications && certifications.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-blue-400">CERTIFICATIONS</h2>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-sm">
                  <div className="font-medium text-white">{cert.name}</div>
                  <div className="text-gray-400">{cert.issuer}</div>
                  {cert.date && (
                    <div className="text-xs text-gray-500">
                      {new Date(cert.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderMainContent = () => (
    <div className="p-8 w-full md:w-2/3 bg-white">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-1">
          {personalInfo?.fullName || 'Your Name'}
        </h1>
        <p className="text-blue-600 text-xl font-medium">
          {personalInfo?.title || 'Professional Title'}
        </p>
      </div>

      {summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            ABOUT ME
          </h2>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
            WORK EXPERIENCE
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-blue-100 pl-4">
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

      {education && education.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
            EDUCATION
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-blue-100 pl-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="text-base font-semibold text-gray-900">{edu.degree}</h3>
                  <span className="text-sm text-blue-600">
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
      )}

      {projects && projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Star className="w-5 h-5 mr-2 text-blue-600" />
            PROJECTS
          </h2>
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id} className="border-l-2 border-blue-100 pl-4">
                <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
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

      {publications && publications.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
            PUBLICATIONS
          </h2>
          <div className="space-y-4">
            {publications.map((pub) => (
              <div key={pub.id} className="border-l-2 border-blue-100 pl-4">
                <h3 className="text-base font-semibold text-gray-900">{pub.title}</h3>
                <p className="text-sm text-gray-600">
                  {pub.journal} • {formatDate(pub.publicationDate)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white text-gray-800 max-w-6xl mx-auto shadow-2xl flex flex-col md:flex-row min-h-screen">
      {renderSidebar()}
      {renderMainContent()}
    </div>
  );
}
