import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, User, Award, BookOpen, Star } from 'lucide-react';
import { TemplateProps } from './types';

export function MinimalistSidebarTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, publications } = data || {};

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const renderSidebar = () => (
    <div className="bg-gray-800 text-white p-6 w-full md:w-1/3">
      {personalInfo?.profileImage && (
        <div className="w-32 h-32 rounded-full bg-gray-700 mx-auto mb-6 overflow-hidden">
          <img 
            src={personalInfo.profileImage} 
            alt={personalInfo.fullName || 'Profile'}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-2">CONTACT</h2>
          <div className="space-y-2 text-sm">
            {personalInfo?.email && (
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-blue-300" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo?.phone && (
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-blue-300" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo?.location && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-blue-300" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo?.website && (
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2 text-blue-300" />
                <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
          </div>
        </div>

        {skills && skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-2">SKILLS</h2>
            <div className="space-y-2">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{skill.name}</span>
                    <span className="text-blue-300">
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
      </div>
    </div>
  );

  const renderMainContent = () => (
    <div className="p-6 w-full md:w-2/3">
      <h1 className="text-3xl font-bold text-gray-800 mb-1">
        {personalInfo?.fullName || 'Your Name'}
      </h1>
      <p className="text-gray-600 text-lg mb-6">
        {personalInfo?.title || 'Professional Title'}
      </p>

      {summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            PROFILE
          </h2>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
            EXPERIENCE
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="text-lg font-semibold text-gray-900">{exp.jobTitle}</h3>
                  <span className="text-sm text-blue-600">
                    {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {exp.company}
                  {exp.location && ` • ${exp.location}`}
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {exp.description.filter(desc => desc.trim()).map((desc, index) => (
                    <li key={index}>{desc}</li>
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
              <div key={edu.id}>
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

      {certifications && certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-blue-600" />
            CERTIFICATIONS
          </h2>
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="text-base font-semibold text-gray-900">{cert.name}</h3>
                <p className="text-sm text-gray-600">
                  {cert.issuer} • {formatDate(cert.date)}
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
              <div key={project.id}>
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
              <div key={pub.id}>
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
    <div className="bg-white text-gray-800 max-w-5xl mx-auto shadow-lg flex flex-col md:flex-row">
      {renderSidebar()}
      {renderMainContent()}
    </div>
  );
}
