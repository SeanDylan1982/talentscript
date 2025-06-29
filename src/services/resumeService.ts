import { DatabaseService, DatabaseResume } from '@/lib/database';
import { ResumeData } from '@/types/resume';

export class ResumeService {
  static async saveResume(userId: string, resumeData: ResumeData, title?: string): Promise<DatabaseResume> {
    try {
      const resumeTitle = title || `${resumeData.personalInfo.fullName || 'Untitled'} Resume`;
      
      if (resumeData.id) {
        // Update existing resume
        const updated = await DatabaseService.updateResume(resumeData.id, userId, resumeData);
        if (!updated) {
          throw new Error('Failed to update resume');
        }
        return updated;
      } else {
        // Create new resume
        return await DatabaseService.createResume(userId, resumeTitle, resumeData, resumeData.template);
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      throw new Error('Failed to save resume');
    }
  }

  static async loadResume(resumeId: string, userId: string): Promise<ResumeData | null> {
    try {
      const resume = await DatabaseService.getResumeById(resumeId, userId);
      if (!resume) {
        return null;
      }

      // Parse the JSON data and add the database ID
      const resumeData = typeof resume.data === 'string' 
        ? JSON.parse(resume.data) 
        : resume.data;
      
      return {
        ...resumeData,
        id: resume.id,
        createdAt: resume.created_at,
        updatedAt: resume.updated_at
      } as ResumeData;
    } catch (error) {
      console.error('Error loading resume:', error);
      throw new Error('Failed to load resume');
    }
  }

  static async getUserResumes(userId: string): Promise<DatabaseResume[]> {
    try {
      return await DatabaseService.getResumesByUserId(userId);
    } catch (error) {
      console.error('Error fetching user resumes:', error);
      throw new Error('Failed to fetch resumes');
    }
  }

  static async deleteResume(resumeId: string, userId: string): Promise<boolean> {
    try {
      return await DatabaseService.deleteResume(resumeId, userId);
    } catch (error) {
      console.error('Error deleting resume:', error);
      throw new Error('Failed to delete resume');
    }
  }

  static async duplicateResume(resumeId: string, userId: string): Promise<DatabaseResume> {
    try {
      const originalResume = await DatabaseService.getResumeById(resumeId, userId);
      if (!originalResume) {
        throw new Error('Resume not found');
      }

      const resumeData = typeof originalResume.data === 'string' 
        ? JSON.parse(originalResume.data) 
        : originalResume.data;

      // Create a copy with a new title
      const newTitle = `${originalResume.title} (Copy)`;
      
      return await DatabaseService.createResume(userId, newTitle, resumeData, originalResume.template);
    } catch (error) {
      console.error('Error duplicating resume:', error);
      throw new Error('Failed to duplicate resume');
    }
  }
}