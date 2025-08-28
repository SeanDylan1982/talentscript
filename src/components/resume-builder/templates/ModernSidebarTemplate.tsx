import { Mail, Phone, MapPin, Globe, Linkedin, Github, Briefcase, GraduationCap, User, BookOpen } from 'lucide-react';
import { TemplateProps } from './types';

export function ModernSidebarTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, publications, customization } = data || {};

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const renderSidebar = () => (
    <div className="w-full md:w-1/3 bg-gray-800 text-white p-6">
      {personalInfo?.profileImage && (
        <div className="w-32 h-32 rounded-full bg-white p-1 mb-6 mx-auto">
          <img 
            src={personalInfo.profileImage} 
            alt={personalInfo.fullName} 
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      )}
      
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-3 text-white border-b pb-2">CONTACT</h2>
          <div className="space-y-2 text-sm">
            {personalInfo?.email && (
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-gray-300" />
                <a href={`mailto:${personalInfo.email}`} className="hover:underline">
                  {personalInfo.email}
                </a>
              </div>
            )}
            {personalInfo?.phone && (
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-300" />
                <a href={`tel:${personalInfo.phone}`} className="hover:underline">
                  {personalInfo.phone}
                </a>
              </div>
            )}
            {personalInfo?.location && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-gray-300" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo?.website && (
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2 text-gray-300" />
                <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {personalInfo.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            {personalInfo?.linkedin && (
              <div className="flex items-center">
                <Linkedin className="w-4 h-4 mr-2 text-gray-300" />
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  LinkedIn
                </a>
              </div>
            )}
            {personalInfo?.github && (
              <div className="flex items-center">
                <Github className="w-4 h-4 mr-2 text-gray-300" />
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  GitHub
                </a>
              </div>
            )}
          </div>
        </div>

        {skills && skills.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3 text-white border-b pb-2">SKILLS</h2>
            <div className="space-y-2">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{skill.name}</span>
                    <span className="text-gray-300">
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
            <h2 className="text-lg font-semibold mb-3 text-white border-b pb-2">CERTIFICATIONS</h2>
            <div className="space-y-2 text-sm">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <h3 className="font-medium">{cert.name}</h3>
                  <p className="text-gray-300">{cert.issuer}</p>
                  <p className="text-xs text-gray-400">
                    {formatDate(cert.date)}
                    {cert.expirationDate && ` • Expires: ${formatDate(cert.expirationDate)}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderMainContent = () => (
    <div className="w-full md:w-2/3 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1" style={{ fontFamily: customization?.fontFamily }}>
          {personalInfo?.fullName}
        </h1>
        {personalInfo?.title && (
          <p className="text-lg text-gray-600" style={{ fontFamily: customization?.fontFamily }}>
            {personalInfo.title}
          </p>
        )}
      </div>

      {summary && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-1 flex items-center">
            <User className="w-5 h-5 mr-2" style={{ color: customization?.accentColor }} />
            PROFILE
          </h2>
          <p className="text-gray-700" style={{ fontFamily: customization?.fontFamily }}>{summary}</p>
        </div>
      )}

      {experience && experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-1 flex items-center">
            <Briefcase className="w-5 h-5 mr-2" style={{ color: customization?.accentColor }} />
            EXPERIENCE
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="break-inside-avoid">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: customization?.fontFamily }}>
                      {exp.jobTitle}
                    </h3>
                    <p className="text-gray-700" style={{ fontFamily: customization?.fontFamily }}>
                      {exp.company}
                      {exp.location && ` • ${exp.location}`}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap ml-2">
                    {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <ul className="mt-2 space-y-1 text-gray-700">
                  {exp.description.map((desc, idx) => (
                    <li key={idx} className="flex" style={{ fontFamily: customization?.fontFamily }}>
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

      {education && education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-1 flex items-center">
            <GraduationCap className="w-5 h-5 mr-2" style={{ color: customization?.accentColor }} />
            EDUCATION
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900" style={{ fontFamily: customization?.fontFamily }}>
                      {edu.degree}
                    </h3>
                    <p className="text-gray-700" style={{ fontFamily: customization?.fontFamily }}>
                      {edu.school}
                      {edu.location && `, ${edu.location}`}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDate(edu.graduationDate)}
                  </span>
                </div>
                {edu.gpa && (
                  <p className="text-sm text-gray-600 mt-1">
                    GPA: {edu.gpa}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {projects && projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-1 flex items-center">
            <BookOpen className="w-5 h-5 mr-2" style={{ color: customization?.accentColor }} />
            PROJECTS
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900" style={{ fontFamily: customization?.fontFamily }}>
                    {project.name}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(project.startDate)}
                    {project.endDate && ` - ${formatDate(project.endDate)}`}
                  </span>
                </div>
                <p className="text-gray-700 mt-1" style={{ fontFamily: customization?.fontFamily }}>
                  {project.description}
                </p>
                {project.technologies.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {project.technologies.map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded"
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
      )}

        {publications && publications.length > 0 && (
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-1 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" style={{ color: customization?.accentColor }} />
                    PUBLICATIONS
                </h2>
                <div className="space-y-4">
                    {publications.map((pub) => (
                        <div key={pub.id}>
                            <h3 className="font-semibold text-gray-900" style={{ fontFamily: customization?.fontFamily }}>
                                {pub.title}
                            </h3>
                            <p className="text-gray-700" style={{ fontFamily: customization?.fontFamily }}>
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

  return (
    <div className="bg-white text-gray-800 max-w-6xl mx-auto shadow-lg flex flex-col md:flex-row min-h-screen" style={{ fontFamily: customization?.fontFamily }}>
      {renderSidebar()}
      {renderMainContent()}
    </div>
  );
}
