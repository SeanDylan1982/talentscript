import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { ResumeData, ResumeSection, WorkExperience, Education, Skill, Certification, Project, Reference } from '@/types/resume';

interface ResumeState {
  resumeData: ResumeData;
  isLoading: boolean;
  hasUnsavedChanges: boolean;
}

type ResumeAction =
  | { type: 'SET_RESUME_DATA'; payload: ResumeData }
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<ResumeData['personalInfo']> }
  | { type: 'UPDATE_SUMMARY'; payload: string }
  | { type: 'ADD_EXPERIENCE'; payload: WorkExperience }
  | { type: 'UPDATE_EXPERIENCE'; payload: { id: string; data: Partial<WorkExperience> } }
  | { type: 'DELETE_EXPERIENCE'; payload: string }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'UPDATE_EDUCATION'; payload: { id: string; data: Partial<Education> } }
  | { type: 'DELETE_EDUCATION'; payload: string }
  | { type: 'ADD_SKILL'; payload: Skill }
  | { type: 'UPDATE_SKILL'; payload: { id: string; data: Partial<Skill> } }
  | { type: 'DELETE_SKILL'; payload: string }
  | { type: 'ADD_CERTIFICATION'; payload: Certification }
  | { type: 'UPDATE_CERTIFICATION'; payload: { id: string; data: Partial<Certification> } }
  | { type: 'DELETE_CERTIFICATION'; payload: string }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: { id: string; data: Partial<Project> } }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'ADD_REFERENCE'; payload: Reference }
  | { type: 'UPDATE_REFERENCE'; payload: { id: string; data: Partial<Reference> } }
  | { type: 'DELETE_REFERENCE'; payload: string }
  | { type: 'REORDER_SECTIONS'; payload: ResumeSection[] }
  | { type: 'UPDATE_TEMPLATE'; payload: ResumeData['template'] }
  | { type: 'UPDATE_CUSTOMIZATION'; payload: Partial<ResumeData['customization']> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'MARK_SAVED' };

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    website: 'https://sarahjohnson.dev',
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    github: 'https://github.com/sarahjohnson',
    profileImage: ''
  },
  summary: 'Experienced Software Engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable web applications and leading cross-functional teams. Passionate about creating user-centric solutions and mentoring junior developers.',
  experience: [
    {
      id: '1',
      jobTitle: 'Senior Software Engineer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      startDate: '2022-03',
      endDate: '',
      isCurrentJob: true,
      description: [
        'Led development of a microservices architecture serving 100K+ daily active users, resulting in 40% improved system performance',
        'Mentored 3 junior developers and established code review processes that reduced bugs by 25%',
        'Collaborated with product managers and designers to deliver 15+ feature releases on schedule',
        'Implemented automated testing strategies that increased code coverage from 60% to 90%'
      ]
    },
    {
      id: '2',
      jobTitle: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'San Francisco, CA',
      startDate: '2020-06',
      endDate: '2022-02',
      isCurrentJob: false,
      description: [
        'Built and maintained React-based web applications with Node.js backends',
        'Designed and implemented RESTful APIs serving mobile and web clients',
        'Optimized database queries resulting in 50% faster page load times',
        'Participated in agile development processes and sprint planning'
      ]
    },
    {
      id: '3',
      jobTitle: 'Junior Software Developer',
      company: 'Digital Innovations Inc.',
      location: 'San Jose, CA',
      startDate: '2019-01',
      endDate: '2020-05',
      isCurrentJob: false,
      description: [
        'Developed responsive web interfaces using HTML, CSS, JavaScript, and React',
        'Collaborated with senior developers to implement new features and fix bugs',
        'Participated in code reviews and contributed to technical documentation',
        'Assisted in migrating legacy systems to modern web technologies'
      ]
    }
  ],
  education: [
    {
      id: '1',
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      graduationDate: '2018-12',
      gpa: '3.8',
      relevantCourses: []
    },
    {
      id: '2',
      degree: 'Associate of Science in Mathematics',
      school: 'City College of San Francisco',
      location: 'San Francisco, CA',
      graduationDate: '2016-05',
      gpa: '3.9',
      relevantCourses: []
    }
  ],
  skills: [
    { id: '1', name: 'JavaScript', level: 'Expert' },
    { id: '2', name: 'React', level: 'Expert' },
    { id: '3', name: 'Node.js', level: 'Advanced' },
    { id: '4', name: 'TypeScript', level: 'Advanced' },
    { id: '5', name: 'Python', level: 'Intermediate' },
    { id: '6', name: 'AWS', level: 'Intermediate' },
    { id: '7', name: 'MongoDB', level: 'Advanced' },
    { id: '8', name: 'PostgreSQL', level: 'Advanced' },
    { id: '9', name: 'Docker', level: 'Intermediate' },
    { id: '10', name: 'Git', level: 'Expert' },
    { id: '11', name: 'Agile/Scrum', level: 'Advanced' },
    { id: '12', name: 'REST APIs', level: 'Expert' }
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023-06',
      expirationDate: '2026-06'
    },
    {
      id: '2',
      name: 'Certified Scrum Master',
      issuer: 'Scrum Alliance',
      date: '2022-09',
      expirationDate: '2024-09'
    }
  ],
  projects: [
    {
      id: '1',
      name: 'E-Commerce Platform',
      description: 'Built a full-stack e-commerce platform with React frontend, Node.js backend, and MongoDB database. Features include user authentication, payment processing, inventory management, and admin dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'JWT', 'Material-UI'],
      url: 'https://github.com/sarahjohnson/ecommerce-platform',
      startDate: '2023-01',
      endDate: '2023-04'
    },
    {
      id: '2',
      name: 'Task Management App',
      description: 'Developed a collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Implemented using React, Socket.io, and Express.',
      technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL', 'Redux', 'Tailwind CSS'],
      url: 'https://github.com/sarahjohnson/task-manager',
      startDate: '2022-08',
      endDate: '2022-11'
    },
    {
      id: '3',
      name: 'Weather Dashboard',
      description: 'Created a responsive weather dashboard that displays current conditions and forecasts for multiple cities. Integrated with OpenWeatherMap API and includes data visualization charts.',
      technologies: ['React', 'Chart.js', 'OpenWeatherMap API', 'CSS3', 'Local Storage'],
      url: 'https://github.com/sarahjohnson/weather-dashboard',
      startDate: '2021-12',
      endDate: '2022-01'
    }
  ],
  references: [
    {
      id: '1',
      name: 'Michael Chen',
      title: 'Engineering Manager',
      company: 'TechCorp Solutions',
      email: 'michael.chen@techcorp.com',
      phone: '(555) 987-6543',
      relationship: 'Direct Manager'
    },
    {
      id: '2',
      name: 'Emily Rodriguez',
      title: 'Senior Product Manager',
      company: 'StartupXYZ',
      email: 'emily.rodriguez@startupxyz.com',
      phone: '(555) 456-7890',
      relationship: 'Former Colleague'
    },
    {
      id: '3',
      name: 'Dr. James Wilson',
      title: 'Computer Science Professor',
      company: 'UC Berkeley',
      email: 'j.wilson@berkeley.edu',
      phone: '(510) 642-1234',
      relationship: 'Academic Reference'
    }
  ],
  sections: [
    { id: '1', type: 'personalInfo', title: 'Personal Information', isVisible: true, order: 1 },
    { id: '2', type: 'summary', title: 'Professional Summary', isVisible: true, order: 2 },
    { id: '3', type: 'experience', title: 'Work Experience', isVisible: true, order: 3 },
    { id: '4', type: 'education', title: 'Education', isVisible: true, order: 4 },
    { id: '5', type: 'skills', title: 'Skills', isVisible: true, order: 5 },
    { id: '6', type: 'certifications', title: 'Certifications', isVisible: true, order: 6 },
    { id: '7', type: 'projects', title: 'Projects', isVisible: true, order: 7 },
    { id: '8', type: 'references', title: 'References', isVisible: true, order: 8 }
  ],
  template: 'minimal',
  customization: {
    fontFamily: 'Inter',
    accentColor: '#3B82F6',
    showProfileImage: false
  }
};

const initialState: ResumeState = {
  resumeData: initialResumeData,
  isLoading: false,
  hasUnsavedChanges: false
};

function resumeReducer(state: ResumeState, action: ResumeAction): ResumeState {
  switch (action.type) {
    case 'SET_RESUME_DATA':
      return {
        ...state,
        resumeData: action.payload,
        hasUnsavedChanges: false
      };
    
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          personalInfo: { ...state.resumeData.personalInfo, ...action.payload }
        },
        hasUnsavedChanges: true
      };
      
    case 'UPDATE_SUMMARY':
      return {
        ...state,
        resumeData: { ...state.resumeData, summary: action.payload },
        hasUnsavedChanges: true
      };
      
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          experience: [...state.resumeData.experience, action.payload]
        },
        hasUnsavedChanges: true
      };
      
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          experience: state.resumeData.experience.map(exp =>
            exp.id === action.payload.id ? { ...exp, ...action.payload.data } : exp
          )
        },
        hasUnsavedChanges: true
      };
      
    case 'DELETE_EXPERIENCE':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          experience: state.resumeData.experience.filter(exp => exp.id !== action.payload)
        },
        hasUnsavedChanges: true
      };
      
    case 'ADD_EDUCATION':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          education: [...state.resumeData.education, action.payload]
        },
        hasUnsavedChanges: true
      };
      
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          education: state.resumeData.education.map(edu =>
            edu.id === action.payload.id ? { ...edu, ...action.payload.data } : edu
          )
        },
        hasUnsavedChanges: true
      };
      
    case 'DELETE_EDUCATION':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          education: state.resumeData.education.filter(edu => edu.id !== action.payload)
        },
        hasUnsavedChanges: true
      };
      
    case 'ADD_SKILL':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          skills: [...state.resumeData.skills, action.payload]
        },
        hasUnsavedChanges: true
      };
      
    case 'UPDATE_SKILL':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          skills: state.resumeData.skills.map(skill =>
            skill.id === action.payload.id ? { ...skill, ...action.payload.data } : skill
          )
        },
        hasUnsavedChanges: true
      };
      
    case 'DELETE_SKILL':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          skills: state.resumeData.skills.filter(skill => skill.id !== action.payload)
        },
        hasUnsavedChanges: true
      };
      
    case 'ADD_CERTIFICATION':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          certifications: [...state.resumeData.certifications, action.payload]
        },
        hasUnsavedChanges: true
      };
      
    case 'UPDATE_CERTIFICATION':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          certifications: state.resumeData.certifications.map(cert =>
            cert.id === action.payload.id ? { ...cert, ...action.payload.data } : cert
          )
        },
        hasUnsavedChanges: true
      };
      
    case 'DELETE_CERTIFICATION':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          certifications: state.resumeData.certifications.filter(cert => cert.id !== action.payload)
        },
        hasUnsavedChanges: true
      };
      
    case 'ADD_PROJECT':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          projects: [...state.resumeData.projects, action.payload]
        },
        hasUnsavedChanges: true
      };
      
    case 'UPDATE_PROJECT':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          projects: state.resumeData.projects.map(project =>
            project.id === action.payload.id ? { ...project, ...action.payload.data } : project
          )
        },
        hasUnsavedChanges: true
      };
      
    case 'DELETE_PROJECT':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          projects: state.resumeData.projects.filter(project => project.id !== action.payload)
        },
        hasUnsavedChanges: true
      };
      
    case 'ADD_REFERENCE':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          references: [...state.resumeData.references, action.payload]
        },
        hasUnsavedChanges: true
      };
      
    case 'UPDATE_REFERENCE':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          references: state.resumeData.references.map(ref =>
            ref.id === action.payload.id ? { ...ref, ...action.payload.data } : ref
          )
        },
        hasUnsavedChanges: true
      };
      
    case 'DELETE_REFERENCE':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          references: state.resumeData.references.filter(ref => ref.id !== action.payload)
        },
        hasUnsavedChanges: true
      };
      
    case 'REORDER_SECTIONS':
      return {
        ...state,
        resumeData: { ...state.resumeData, sections: action.payload },
        hasUnsavedChanges: true
      };
      
    case 'UPDATE_TEMPLATE':
      return {
        ...state,
        resumeData: { ...state.resumeData, template: action.payload },
        hasUnsavedChanges: true
      };
      
    case 'UPDATE_CUSTOMIZATION':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          customization: { ...state.resumeData.customization, ...action.payload }
        },
        hasUnsavedChanges: true
      };
      
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
      
    case 'MARK_SAVED':
      return { ...state, hasUnsavedChanges: false };
      
    default:
      return state;
  }
}

interface ResumeContextType {
  state: ResumeState;
  dispatch: React.Dispatch<ResumeAction>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  // Auto-save functionality (disabled for now since we don't have backend)
  useEffect(() => {
    if (state.hasUnsavedChanges) {
      const timer = setTimeout(() => {
        // Auto-save logic would go here when backend is implemented
        console.log('Auto-save would trigger here...');
        // For now, just mark as saved after a delay to show the functionality
        // dispatch({ type: 'MARK_SAVED' });
      }, 5000); // 5 seconds delay

      return () => clearTimeout(timer);
    }
  }, [state.hasUnsavedChanges, state.resumeData]);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}