import { Mail, Phone, MapPin, Linkedin, Briefcase, GraduationCap } from 'lucide-react';
import { ResumeData } from '@/types/resume';

type TemplateProps = {
  data: ResumeData;
};

export function ProfessionalSidebarTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills } = data;
  const accentColor = data.customization.accentColor || '#2563eb';
  
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white" style={{ fontFamily: data.customization.fontFamily }}>
      {/* Sidebar */}
      <div className="w-full md:w-1/3 bg-gray-900 text-white p-8">
        {/* Profile */}
        <div className="text-center mb-8">
          {personalInfo.profileImage ? (
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-white">
              <img src={personalInfo.profileImage} alt={personalInfo.fullName} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-700 mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl text-white">
                {personalInfo.fullName.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          )}
          <h1 className="text-2xl font-bold">{personalInfo.fullName}</h1>
          {personalInfo.title && <p className="text-gray-300 mt-1">{personalInfo.title}</p>}
        </div>

        {/* Contact */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-700">Contact</h2>
          <ul className="space-y-3">
            {personalInfo.email && (
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-gray-400" />
                <span>{personalInfo.email}</span>
              </li>
            )}
            {personalInfo.phone && (
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-gray-400" />
                <span>{personalInfo.phone}</span>
              </li>
            )}
            {personalInfo.location && (
              <li className="flex items-center">
                <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                <span>{personalInfo.location}</span>
              </li>
            )}
            {personalInfo.linkedin && (
              <li className="flex items-center">
                <Linkedin className="w-4 h-4 mr-3 text-gray-400" />
                <span>LinkedIn</span>
              </li>
            )}
          </ul>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-700">Skills</h2>
            <div className="space-y-2">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{skill.name}</span>
                    <span className="text-gray-400">{skill.level}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full" 
                      style={{ 
                        width: skill.level === 'Expert' ? '100%' : 
                               skill.level === 'Advanced' ? '80%' : 
                               skill.level === 'Intermediate' ? '60%' : '40%',
                        backgroundColor: '#ffffff'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-full md:w-2/3 p-8">
        {/* Summary */}
        {summary && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
              Professional Summary
            </h2>
            <p className="text-gray-700">{summary}</p>
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
                <div key={exp.id}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
                    <span className="text-sm text-gray-500">
                      {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium">
                    {exp.company}
                    {exp.location && ` • ${exp.location}`}
                  </p>
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
        {education.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" style={{ color: accentColor }} />
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-gray-700">
                    {edu.school}
                    {edu.location && `, ${edu.location}`}
                  </p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{edu.relevantCourses ? edu.relevantCourses.join(', ') : ''}</span>
                    <span>{formatDate(edu.graduationDate)}</span>
                  </div>
                  {edu.gpa && (
                    <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
