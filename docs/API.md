# TalentScript API Documentation

## Overview

TalentScript is a client-side application that doesn't require a backend API. However, this document outlines the internal data structures and methods used throughout the application.

## Data Types

### Core Types

#### `PersonalInfo`
```typescript
interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  profileImage?: string; // Base64 encoded image
}
```

#### `WorkExperience`
```typescript
interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string; // YYYY-MM format
  endDate: string;   // YYYY-MM format
  isCurrentJob: boolean;
  description: string[]; // Array of bullet points
}
```

#### `Education`
```typescript
interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  graduationDate: string; // YYYY-MM format
  gpa?: string;
  relevantCourses?: string[];
}
```

#### `Skill`
```typescript
interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}
```

#### `Certification`
```typescript
interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string; // YYYY-MM format
  expirationDate?: string; // YYYY-MM format
}
```

#### `Project`
```typescript
interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  startDate: string; // YYYY-MM format
  endDate?: string;  // YYYY-MM format
}
```

#### `Reference`
```typescript
interface Reference {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  relationship: string;
}
```

### Configuration Types

#### `ResumeSection`
```typescript
interface ResumeSection {
  id: string;
  type: ResumeSectionType;
  title: string;
  isVisible: boolean;
  order: number;
}

type ResumeSectionType = 
  | 'personalInfo'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'certifications'
  | 'projects'
  | 'references';
```

#### `ResumeData`
```typescript
interface ResumeData {
  id?: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  projects: Project[];
  references: Reference[];
  sections: ResumeSection[];
  template: 'minimal' | 'modern' | 'creative';
  customization: {
    fontFamily: string;
    accentColor: string;
    showProfileImage: boolean;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
```

## Context API

### ResumeContext

The application uses React Context for state management.

#### State Structure
```typescript
interface ResumeState {
  resumeData: ResumeData;
  isLoading: boolean;
  hasUnsavedChanges: boolean;
}
```

#### Available Actions
```typescript
type ResumeAction =
  | { type: 'SET_RESUME_DATA'; payload: ResumeData }
  | { type: 'LOAD_FROM_STORAGE'; payload: ResumeData }
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<PersonalInfo> }
  | { type: 'UPDATE_SUMMARY'; payload: string }
  | { type: 'ADD_EXPERIENCE'; payload: WorkExperience }
  | { type: 'UPDATE_EXPERIENCE'; payload: { id: string; data: Partial<WorkExperience> } }
  | { type: 'DELETE_EXPERIENCE'; payload: string }
  | { type: 'REORDER_EXPERIENCE'; payload: WorkExperience[] }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'UPDATE_EDUCATION'; payload: { id: string; data: Partial<Education> } }
  | { type: 'DELETE_EDUCATION'; payload: string }
  | { type: 'REORDER_EDUCATION'; payload: Education[] }
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
```

#### Usage Example
```typescript
import { useResume } from '@/contexts/ResumeContext';

function MyComponent() {
  const { state, dispatch } = useResume();
  
  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrentJob: false,
      description: ['']
    };
    dispatch({ type: 'ADD_EXPERIENCE', payload: newExperience });
  };
  
  return (
    <div>
      {state.resumeData.experience.map(exp => (
        <div key={exp.id}>{exp.jobTitle}</div>
      ))}
    </div>
  );
}
```

## Utility Functions

### Font Loader (`src/utils/fontLoader.ts`)

#### `loadGoogleFont(fontFamily: string): Promise<void>`
Dynamically loads a Google Font.

```typescript
import { loadGoogleFont } from '@/utils/fontLoader';

await loadGoogleFont('Inter');
```

#### `preloadAllFonts(): Promise<void>`
Preloads all available Google Fonts.

#### `GOOGLE_FONTS`
Array of available font options:
```typescript
const GOOGLE_FONTS = [
  { name: 'Inter', value: 'Inter' },
  { name: 'Roboto', value: 'Roboto' },
  // ... more fonts
];
```

### PDF Generator (`src/utils/pdfGenerator.ts`)

#### `generatePDF(elementId: string, options?: PDFOptions): Promise<void>`
Generates and downloads a PDF from a DOM element.

```typescript
interface PDFOptions {
  filename?: string;
  quality?: number;
  format?: 'a4' | 'letter';
  margin?: number;
}

// Usage
await generatePDF('resume-preview', {
  filename: 'my-resume.pdf',
  quality: 1,
  format: 'a4',
  margin: 10
});
```

#### `generateResumeFilename(fullName: string): string`
Creates a standardized filename for resume downloads.

```typescript
const filename = generateResumeFilename('John Doe');
// Returns: "john_doe_2024-01-15.pdf"
```

## Local Storage

### Data Persistence

The application automatically saves data to browser localStorage:

#### Storage Key
```typescript
const STORAGE_KEY = 'talentscript_resume_data';
```

#### Storage Format
```typescript
interface StoredData {
  resumeData: ResumeData;
  savedAt: string; // ISO date string
  version: string; // App version
}
```

#### Tutorial Completion
```typescript
const TUTORIAL_KEY = 'talentscript_tutorial_completed';
// Value: 'true' when completed
```

## Component Props

### Template Components

All template components receive the same props:

```typescript
interface TemplateProps {
  data: ResumeData;
}
```

### Form Components

Form components typically don't receive props but use the ResumeContext:

```typescript
// Example: ExperienceForm
export function ExperienceForm() {
  const { state, dispatch } = useResume();
  // Component logic
}
```

### Tutorial Component

```typescript
interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTabChange: (tab: string) => void;
}
```

## Error Handling

### PDF Generation Errors
```typescript
try {
  await generatePDF('resume-preview');
} catch (error) {
  console.error('PDF generation failed:', error);
  // Show user-friendly error message
}
```

### Font Loading Errors
```typescript
try {
  await loadGoogleFont('CustomFont');
} catch (error) {
  console.warn('Font loading failed:', error);
  // Fallback to default font
}
```

### Storage Errors
```typescript
try {
  const data = localStorage.getItem('talentscript_resume_data');
  const parsed = JSON.parse(data);
} catch (error) {
  console.warn('Failed to load saved data:', error);
  // Use default data
}
```

## Constants

### Available Templates
```typescript
const TEMPLATES = [
  { name: 'Minimal', value: 'minimal' },
  { name: 'Modern', value: 'modern' },
  { name: 'Creative', value: 'creative' }
];
```

### Accent Colors
```typescript
const ACCENT_COLORS = [
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Indigo', value: '#6366F1' },
  { name: 'Purple', value: '#8B5CF6' },
  // ... more colors
];
```

### Skill Levels
```typescript
type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
```

## Best Practices

### State Updates
- Always use the dispatch function from ResumeContext
- Use specific action types for different operations
- Include proper TypeScript types for payloads

### Error Handling
- Wrap async operations in try-catch blocks
- Provide fallback behavior for failed operations
- Log errors for debugging but show user-friendly messages

### Performance
- Use React.memo for expensive components
- Debounce frequent updates (auto-save)
- Lazy load fonts and images when possible

### Accessibility
- Include proper ARIA labels
- Ensure keyboard navigation works
- Maintain color contrast ratios
- Provide alternative text for images