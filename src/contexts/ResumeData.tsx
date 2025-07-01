import { ResumeData } from '@/types/resume'

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    website: 'https://sarahjohnson.dev',
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    github: 'https://github.com/sarahjohnson',
    profileImage: '../src/img/user.jpeg'
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
    showProfileImage: true
  }
};

export default initialResumeData;