import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import { ResumeData } from '@/types/resume';

type TemplateProps = {
  data: ResumeData;
};

export function CleanMinimalistTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications } = data;
  const accentColor = data.customization.accentColor || '#2563eb';
  
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white" style={{ fontFamily: data.customization.fontFamily }}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          {personalInfo.fullName}
        </h1>
        {personalInfo.title && (
          <p className="text-lg text-gray-600 mb-3">
            {personalInfo.title}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-600">
          {personalInfo.email && (
            <span className="flex items-center">
              <Mail className="w-3.5 h-3.5 mr-1" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center">
              <Phone className="w-3.5 h-3.5 mr-1" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center">
              <Linkedin className="w-3.5 h-3.5 mr-1" />
              LinkedIn
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center">
              <Globe className="w-3.5 h-3.5 mr-1" />
              {personalInfo.website.replace(/^https?:\/\//, '')}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 pb-1 border-b border-gray-200">
            SUMMARY
          </h2>
          <p className="text-gray-700">
            {summary}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-8">
          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-1 border-b border-gray-200">
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-base font-semibold">{exp.jobTitle}</h3>
                      <span className="text-sm text-gray-500">
                        {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">
                      {exp.company}
                      {exp.location && `, ${exp.location}`}
                    </p>
                    <ul className="space-y-1.5 mt-2">
                      {exp.description.map((desc, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex">
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
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-1 border-b border-gray-200">
                EDUCATION
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-sm text-gray-700">
                      {edu.school}
                      {edu.location && `, ${edu.location}`}
                    </p>
                    <div className="flex justify-between text-sm text-gray-500">
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
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-1 border-b border-gray-200">
                SKILLS
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
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-1 border-b border-gray-200">
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
      </div>
    </div>
  );
}
