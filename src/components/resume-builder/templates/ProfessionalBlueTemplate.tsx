import { Briefcase, GraduationCap, Code, User } from 'lucide-react';
import { TemplateProps } from './types';

export function ProfessionalBlueTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills } = data || {};

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white text-gray-800 max-w-4xl mx-auto shadow-lg">
      {/* Personal Info */}
      <div className="bg-blue-700 text-white p-6">
        <div className="flex flex-col md:flex-row items-center">
          {personalInfo.profileImage && (
            <div className="w-32 h-32 rounded-full bg-white mb-4 md:mb-0 md:mr-8 overflow-hidden">
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.fullName || 'Profile'}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">{personalInfo.fullName || 'Your Name'}</h1>
            <p className="text-blue-100 text-lg mt-1">{personalInfo.title || 'Professional Title'}</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="bg-white p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            PROFILE
          </h2>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="bg-white p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
            WORK EXPERIENCE
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-blue-200 pl-4">
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
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
            EDUCATION
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-blue-200 pl-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="text-base font-semibold text-gray-900">{edu.degree}</h3>
                  <span className="text-sm text-blue-600 font-medium">
                    {edu.graduationDate ? formatDate(edu.graduationDate) : ''}
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

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="bg-white p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Code className="w-5 h-5 mr-2 text-blue-600" />
            SKILLS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill) => (
              <div key={skill.id} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-800">
                    {skill.name}
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
    </div>
  );
}
