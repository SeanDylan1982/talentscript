import { Briefcase, GraduationCap, Code, Award } from 'lucide-react';
import { ResumeData } from '@/types/resume';

type TemplateProps = {
  data: ResumeData;
};

export function TimelineTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications } = data;
  const accentColor = data.customization.accentColor || '#3b82f6';
  
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="bg-white text-gray-800 max-w-4xl mx-auto p-6" style={{ fontFamily: data.customization.fontFamily }}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{personalInfo.fullName}</h1>
        {personalInfo.title && (
          <p className="text-lg text-gray-600 mb-4">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-10 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Professional Summary</h2>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}

      {/* Timeline Section */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        <div className="space-y-10">
          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Briefcase className="w-5 h-5 mr-2" style={{ color: accentColor }} />
                Work Experience
              </h2>
              <div className="space-y-8">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-10">
                    <div 
                      className="absolute left-0 w-3 h-3 rounded-full border-2 border-white shadow-md" 
                      style={{ 
                        backgroundColor: accentColor,
                        top: '0.25rem',
                        left: '-0.125rem'
                      }}
                    ></div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                        <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
                        <span className="text-sm text-gray-500">
                          {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                        </span>
                      </div>
                      <p className="text-gray-700 font-medium mb-2">
                        {exp.company}
                        {exp.location && ` • ${exp.location}`}
                      </p>
                      <ul className="space-y-1.5 mt-3">
                        {exp.description.map((desc, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="mr-2 mt-1.5 text-xs" style={{ color: accentColor }}>•</span>
                            <span className="text-gray-700">{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" style={{ color: accentColor }} />
                Education
              </h2>
              <div className="space-y-8">
                {education.map((edu) => (
                  <div key={edu.id} className="relative pl-10">
                    <div 
                      className="absolute left-0 w-3 h-3 rounded-full border-2 border-white shadow-md" 
                      style={{ 
                        backgroundColor: accentColor,
                        top: '0.25rem',
                        left: '-0.125rem'
                      }}
                    ></div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                        <h3 className="text-lg font-semibold">{edu.degree}</h3>
                        <span className="text-sm text-gray-500">
                          {formatDate(edu.graduationDate)}
                        </span>
                      </div>
                      <p className="text-gray-700 font-medium">
                        {edu.school}
                        {edu.location && `, ${edu.location}`}
                      </p>
                      {edu.gpa && (
                        <p className="text-sm text-gray-600 mt-1">
                          GPA: {edu.gpa}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Skills & Certifications */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Code className="w-5 h-5 mr-2" style={{ color: accentColor }} />
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span 
                  key={skill.id} 
                  className="px-3 py-1 text-sm rounded-full"
                  style={{ 
                    backgroundColor: `${accentColor}15`,
                    color: accentColor,
                    border: `1px solid ${accentColor}40`
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2" style={{ color: accentColor }} />
              Certifications
            </h2>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.id} className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="font-medium">{cert.name}</h3>
                  <p className="text-sm text-gray-600">
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
