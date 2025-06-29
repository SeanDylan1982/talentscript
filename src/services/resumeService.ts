import { ResumeData } from '@/types/resume';

interface DatabaseResume {
  id: string;
  user_id: string;
  title: string;
  data: any;
  template: string;
  created_at: Date;
  updated_at: Date;
}

export class ResumeService {
  private static readonly API_BASE = '/.netlify/functions';

  static async saveResume(userId: string, resumeData: ResumeData, title?: string): Promise<DatabaseResume> {
    try {
      const resumeTitle = title || `${resumeData.personalInfo.fullName || 'Untitled'} Resume`;
      
      const response = await fetch(`${this.API_BASE}/resumes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'save',
          userId,
          resumeId: resumeData.id,
          title: resumeTitle,
          data: resumeData,
          template: resumeData.template
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save resume');
      }

      return data.resume;
    } catch (error) {
      console.error('Error saving resume:', error);
      throw new Error('Failed to save resume');
    }
  }

  static async loadResume(resumeId: string, userId: string): Promise<ResumeData | null> {
    try {
      const response = await fetch(`${this.API_BASE}/resumes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'load',
          userId,
          resumeId
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(data.error || 'Failed to load resume');
      }

      return data.resume as ResumeData;
    } catch (error) {
      console.error('Error loading resume:', error);
      throw new Error('Failed to load resume');
    }
  }

  static async getUserResumes(userId: string): Promise<DatabaseResume[]> {
    try {
      const response = await fetch(`${this.API_BASE}/resumes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'list',
          userId
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch resumes');
      }

      return data.resumes;
    } catch (error) {
      console.error('Error fetching user resumes:', error);
      throw new Error('Failed to fetch resumes');
    }
  }

  static async deleteResume(resumeId: string, userId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.API_BASE}/resumes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'delete',
          userId,
          resumeId
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete resume');
      }

      return data.success;
    } catch (error) {
      console.error('Error deleting resume:', error);
      throw new Error('Failed to delete resume');
    }
  }

  static async duplicateResume(resumeId: string, userId: string): Promise<DatabaseResume> {
    try {
      const response = await fetch(`${this.API_BASE}/resumes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'duplicate',
          userId,
          resumeId
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to duplicate resume');
      }

      return data.resume;
    } catch (error) {
      console.error('Error duplicating resume:', error);
      throw new Error('Failed to duplicate resume');
    }
  }
}