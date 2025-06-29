import { neon } from '@neondatabase/serverless';

// Initialize the database connection
const sql = neon(import.meta.env.VITE_DATABASE_URL || '');

export interface DatabaseResume {
  id: string;
  user_id: string;
  title: string;
  data: any;
  template: string;
  created_at: Date;
  updated_at: Date;
}

export class DatabaseService {
  // Initialize database tables
  static async initializeTables(): Promise<void> {
    try {
      // Create users table if it doesn't exist
      await sql`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          name TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;

      // Create resumes table if it doesn't exist
      await sql`
        CREATE TABLE IF NOT EXISTS resumes (
          id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
          user_id TEXT NOT NULL,
          title TEXT NOT NULL,
          data JSONB NOT NULL,
          template TEXT NOT NULL DEFAULT 'minimal',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `;

      console.log('Database tables initialized successfully');
    } catch (error) {
      console.error('Error initializing database tables:', error);
      throw error;
    }
  }

  // User operations
  static async createUser(id: string, email: string, name: string): Promise<void> {
    try {
      await sql`
        INSERT INTO users (id, email, name)
        VALUES (${id}, ${email}, ${name})
        ON CONFLICT (id) DO UPDATE SET
          email = EXCLUDED.email,
          name = EXCLUDED.name,
          updated_at = CURRENT_TIMESTAMP
      `;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static async getUser(id: string): Promise<any> {
    try {
      const result = await sql`
        SELECT * FROM users WHERE id = ${id}
      `;
      return result[0] || null;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }

  // Resume operations
  static async createResume(userId: string, title: string, data: any, template: string): Promise<DatabaseResume> {
    try {
      const result = await sql`
        INSERT INTO resumes (user_id, title, data, template)
        VALUES (${userId}, ${title}, ${JSON.stringify(data)}, ${template})
        RETURNING id, user_id, title, data, template, created_at, updated_at
      `;
      return result[0] as DatabaseResume;
    } catch (error) {
      console.error('Error creating resume:', error);
      throw error;
    }
  }

  static async updateResume(id: string, userId: string, data: any): Promise<DatabaseResume | null> {
    try {
      const result = await sql`
        UPDATE resumes 
        SET data = ${JSON.stringify(data)}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id} AND user_id = ${userId}
        RETURNING id, user_id, title, data, template, created_at, updated_at
      `;
      return result[0] as DatabaseResume || null;
    } catch (error) {
      console.error('Error updating resume:', error);
      throw error;
    }
  }

  static async getResumesByUserId(userId: string): Promise<DatabaseResume[]> {
    try {
      const result = await sql`
        SELECT id, user_id, title, data, template, created_at, updated_at
        FROM resumes 
        WHERE user_id = ${userId}
        ORDER BY updated_at DESC
      `;
      return result as DatabaseResume[];
    } catch (error) {
      console.error('Error getting user resumes:', error);
      throw error;
    }
  }

  static async getResumeById(id: string, userId: string): Promise<DatabaseResume | null> {
    try {
      const result = await sql`
        SELECT id, user_id, title, data, template, created_at, updated_at
        FROM resumes 
        WHERE id = ${id} AND user_id = ${userId}
      `;
      return result[0] as DatabaseResume || null;
    } catch (error) {
      console.error('Error getting resume by id:', error);
      throw error;
    }
  }

  static async deleteResume(id: string, userId: string): Promise<boolean> {
    try {
      const result = await sql`
        DELETE FROM resumes 
        WHERE id = ${id} AND user_id = ${userId}
        RETURNING id
      `;
      return result.length > 0;
    } catch (error) {
      console.error('Error deleting resume:', error);
      throw error;
    }
  }

  static async duplicateResume(id: string, userId: string): Promise<DatabaseResume> {
    try {
      // First get the original resume
      const originalResume = await this.getResumeById(id, userId);
      if (!originalResume) {
        throw new Error('Resume not found');
      }

      const resumeData = typeof originalResume.data === 'string' 
        ? JSON.parse(originalResume.data) 
        : originalResume.data;

      const newTitle = `${originalResume.title} (Copy)`;
      return await this.createResume(userId, newTitle, resumeData, originalResume.template);
    } catch (error) {
      console.error('Error duplicating resume:', error);
      throw error;
    }
  }
}