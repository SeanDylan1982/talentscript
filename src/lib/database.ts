import { neon } from "@neondatabase/serverless";

// Initialize Neon database connection
const sql = neon(process.env.DATABASE_URL || '');

export { sql };

// Database schema types
export interface DatabaseUser {
  id: string;
  email: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface DatabaseResume {
  id: string;
  user_id: string;
  title: string;
  data: any; // JSON data containing the resume information
  template: string;
  created_at: Date;
  updated_at: Date;
}

// Database utility functions
export class DatabaseService {
  // User operations
  static async createUser(email: string, name: string, passwordHash: string): Promise<DatabaseUser> {
    const result = await sql`
      INSERT INTO users (email, name, password_hash)
      VALUES (${email}, ${name}, ${passwordHash})
      RETURNING id, email, name, created_at, updated_at
    `;
    return result[0] as DatabaseUser;
  }

  static async getUserByEmail(email: string): Promise<DatabaseUser | null> {
    const result = await sql`
      SELECT id, email, name, created_at, updated_at
      FROM users 
      WHERE email = ${email}
    `;
    return result[0] as DatabaseUser || null;
  }

  static async getUserById(id: string): Promise<DatabaseUser | null> {
    const result = await sql`
      SELECT id, email, name, created_at, updated_at
      FROM users 
      WHERE id = ${id}
    `;
    return result[0] as DatabaseUser || null;
  }

  // Resume operations
  static async createResume(userId: string, title: string, data: any, template: string): Promise<DatabaseResume> {
    const result = await sql`
      INSERT INTO resumes (user_id, title, data, template)
      VALUES (${userId}, ${title}, ${JSON.stringify(data)}, ${template})
      RETURNING id, user_id, title, data, template, created_at, updated_at
    `;
    return result[0] as DatabaseResume;
  }

  static async updateResume(id: string, userId: string, data: any): Promise<DatabaseResume | null> {
    const result = await sql`
      UPDATE resumes 
      SET data = ${JSON.stringify(data)}, updated_at = NOW()
      WHERE id = ${id} AND user_id = ${userId}
      RETURNING id, user_id, title, data, template, created_at, updated_at
    `;
    return result[0] as DatabaseResume || null;
  }

  static async getResumesByUserId(userId: string): Promise<DatabaseResume[]> {
    const result = await sql`
      SELECT id, user_id, title, data, template, created_at, updated_at
      FROM resumes 
      WHERE user_id = ${userId}
      ORDER BY updated_at DESC
    `;
    return result as DatabaseResume[];
  }

  static async getResumeById(id: string, userId: string): Promise<DatabaseResume | null> {
    const result = await sql`
      SELECT id, user_id, title, data, template, created_at, updated_at
      FROM resumes 
      WHERE id = ${id} AND user_id = ${userId}
    `;
    return result[0] as DatabaseResume || null;
  }

  static async deleteResume(id: string, userId: string): Promise<boolean> {
    const result = await sql`
      DELETE FROM resumes 
      WHERE id = ${id} AND user_id = ${userId}
      RETURNING id
    `;
    return result.length > 0;
  }

  // Database initialization
  static async initializeDatabase(): Promise<void> {
    try {
      // Create users table
      await sql`
        CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email VARCHAR(255) UNIQUE NOT NULL,
          name VARCHAR(255) NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )
      `;

      // Create resumes table
      await sql`
        CREATE TABLE IF NOT EXISTS resumes (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          title VARCHAR(255) NOT NULL,
          data JSONB NOT NULL,
          template VARCHAR(50) NOT NULL DEFAULT 'minimal',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )
      `;

      // Create indexes for better performance
      await sql`
        CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id)
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS idx_resumes_updated_at ON resumes(updated_at)
      `;

      console.log('Database tables initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }
}