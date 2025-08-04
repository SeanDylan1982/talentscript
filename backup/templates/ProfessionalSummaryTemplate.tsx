import { ResumeData } from '@/types/resume';
import { Briefcase, GraduationCap, User, Code, Mail, Phone, MapPin, Globe } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export function ProfessionalSummaryTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications } = data;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white text-gray-800 max-w-4xl mx-auto shadow-lg p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-blue-700 text-lg">{personalInfo.title || 'Professional Title'}</p>
        
        <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-1 text-blue-600" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-1 text-blue-600" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1 text-blue-600" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center">
              <Globe className="w-4 h-4 mr-1 text-blue-600" />
              <a href={personalInfo.website} className="hover:underline">
                {personalInfo.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-8">
          {/* Experience */}
          {experience.length > 0 && (
            <div>
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

          {/* Education */}
          {education.length > 0 && (
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
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2 text-blue-600" />
                SKILLS
              </h2>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-800">
                        {skill.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {skill.level}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div 
                        className="h-1.5 rounded-full bg-blue-600" 
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

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">CERTIFICATIONS</h2>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id} className="text-sm">
                    <div className="font-medium text-gray-900">{cert.name}</div>
                    <div className="text-gray-600">{cert.issuer}</div>
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
    </div>
  );
}
