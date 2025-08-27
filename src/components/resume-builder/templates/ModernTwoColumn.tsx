import { Mail, Phone, MapPin, Globe, Linkedin, Github, Briefcase, GraduationCap, Code, Award } from 'lucide-react';
import { ResumeData } from '@/types/resume';

type TemplateProps = {
  data: ResumeData;
};

export function ModernTwoColumn({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications } = data;
  const accentColor = data.customization.accentColor || '#3b82f6';
  
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="bg-white text-gray-800 max-w-5xl mx-auto shadow-lg flex flex-col md:flex-row" style={{ fontFamily: data.customization.fontFamily }}>
      {/* Left Column */}
      <div className="w-full md:w-2/5 bg-gray-50 p-6">
        {/* Profile */}
        <div className="mb-8 text-center">
          <div className="w-32 h-32 rounded-full bg-white p-1 shadow-md mx-auto mb-4 overflow-hidden">
            {personalInfo.profileImage ? (
              <img 
                src={personalInfo.profileImage} 
                alt={personalInfo.fullName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-4xl text-gray-400">
                  {personalInfo.fullName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
          </div>
          <h1 className="text-xl font-bold text-gray-900">{personalInfo.fullName}</h1>
          {personalInfo.title && (
            <p className="text-sm text-gray-600 mt-1">{personalInfo.title}</p>
          )}
        </div>

        {/* Contact */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wider">Contact</h2>
          <ul className="space-y-2 text-sm">
            {personalInfo.email && (
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-gray-500" />
                <span>{personalInfo.email}</span>
              </li>
            )}
            {personalInfo.phone && (
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-500" />
                <span>{personalInfo.phone}</span>
              </li>
            )}
            {personalInfo.location && (
              <li className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                <span>{personalInfo.location}</span>
              </li>
            )}
            {personalInfo.linkedin && (
              <li className="flex items-center">
                <Linkedin className="w-4 h-4 mr-2 text-gray-500" />
                <span>LinkedIn</span>
              </li>
            )}
          </ul>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wider">Skills</h2>
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{skill.name}</span>
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
      </div>

      {/* Right Column */}
      <div className="w-full md:w-3/5 p-6">
        {/* Summary */}
        {summary && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 pb-1 border-b border-gray-200">
              About Me
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 pb-1 border-b border-gray-200">
              Work Experience
            </h2>
            <div className="space-y-5">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-semibold">{exp.jobTitle}</h3>
                      <p className="text-sm text-gray-700">
                        {exp.company}
                        {exp.location && ` • ${exp.location}`}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <ul className="mt-2 space-y-1 text-sm">
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
        {education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 pb-1 border-b border-gray-200">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-semibold">{edu.degree}</h3>
                      <p className="text-sm text-gray-700">
                        {edu.school}
                        {edu.location && `, ${edu.location}`}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDate(edu.graduationDate)}
                    </span>
                  </div>
                  {edu.gpa && (
                    <p className="text-xs text-gray-600 mt-1">
                      GPA: {edu.gpa}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3 pb-1 border-b border-gray-200">
              Certifications
            </h2>
            <div className="space-y-3">
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
      </div>
    </div>
  );
}
