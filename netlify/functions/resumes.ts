import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL || '');

interface DatabaseResume {
  id: string;
  user_id: string;
  title: string;
  data: any;
  template: string;
  created_at: Date;
  updated_at: Date;
}

async function createResume(userId: string, title: string, data: any, template: string): Promise<DatabaseResume> {
  const result = await sql`
    INSERT INTO resumes (user_id, title, data, template)
    VALUES (${userId}, ${title}, ${JSON.stringify(data)}, ${template})
    RETURNING id, user_id, title, data, template, created_at, updated_at
  `;
  return result[0] as DatabaseResume;
}

async function updateResume(id: string, userId: string, data: any): Promise<DatabaseResume | null> {
  const result = await sql`
    UPDATE resumes 
    SET data = ${JSON.stringify(data)}, updated_at = NOW()
    WHERE id = ${id} AND user_id = ${userId}
    RETURNING id, user_id, title, data, template, created_at, updated_at
  `;
  return result[0] as DatabaseResume || null;
}

async function getResumesByUserId(userId: string): Promise<DatabaseResume[]> {
  const result = await sql`
    SELECT id, user_id, title, data, template, created_at, updated_at
    FROM resumes 
    WHERE user_id = ${userId}
    ORDER BY updated_at DESC
  `;
  return result as DatabaseResume[];
}

async function getResumeById(id: string, userId: string): Promise<DatabaseResume | null> {
  const result = await sql`
    SELECT id, user_id, title, data, template, created_at, updated_at
    FROM resumes 
    WHERE id = ${id} AND user_id = ${userId}
  `;
  return result[0] as DatabaseResume || null;
}

async function deleteResume(id: string, userId: string): Promise<boolean> {
  const result = await sql`
    DELETE FROM resumes 
    WHERE id = ${id} AND user_id = ${userId}
    RETURNING id
  `;
  return result.length > 0;
}

export async function handler(event: any, context: any) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { action, userId, resumeId, title, data, template } = JSON.parse(event.body || '{}');

    switch (action) {
      case 'save':
        try {
          const resumeTitle = title || 'Untitled Resume';
          
          if (resumeId) {
            // Update existing resume
            const updated = await updateResume(resumeId, userId, data);
            if (!updated) {
              return {
                statusCode: 404,
                headers,
                body: JSON.stringify({ error: 'Resume not found' })
              };
            }
            return {
              statusCode: 200,
              headers,
              body: JSON.stringify({ resume: updated })
            };
          } else {
            // Create new resume
            const resume = await createResume(userId, resumeTitle, data, template);
            return {
              statusCode: 200,
              headers,
              body: JSON.stringify({ resume })
            };
          }
        } catch (error) {
          console.error('Error saving resume:', error);
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to save resume' })
          };
        }

      case 'load':
        try {
          const resume = await getResumeById(resumeId, userId);
          if (!resume) {
            return {
              statusCode: 404,
              headers,
              body: JSON.stringify({ error: 'Resume not found' })
            };
          }

          const resumeData = typeof resume.data === 'string' 
            ? JSON.parse(resume.data) 
            : resume.data;
          
          const result = {
            ...resumeData,
            id: resume.id,
            createdAt: resume.created_at,
            updatedAt: resume.updated_at
          };

          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ resume: result })
          };
        } catch (error) {
          console.error('Error loading resume:', error);
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to load resume' })
          };
        }

      case 'list':
        try {
          const resumes = await getResumesByUserId(userId);
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ resumes })
          };
        } catch (error) {
          console.error('Error fetching resumes:', error);
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to fetch resumes' })
          };
        }

      case 'delete':
        try {
          const success = await deleteResume(resumeId, userId);
          if (!success) {
            return {
              statusCode: 404,
              headers,
              body: JSON.stringify({ error: 'Resume not found' })
            };
          }
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true })
          };
        } catch (error) {
          console.error('Error deleting resume:', error);
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to delete resume' })
          };
        }

      case 'duplicate':
        try {
          const originalResume = await getResumeById(resumeId, userId);
          if (!originalResume) {
            return {
              statusCode: 404,
              headers,
              body: JSON.stringify({ error: 'Resume not found' })
            };
          }

          const resumeData = typeof originalResume.data === 'string' 
            ? JSON.parse(originalResume.data) 
            : originalResume.data;

          const newTitle = `${originalResume.title} (Copy)`;
          const duplicatedResume = await createResume(userId, newTitle, resumeData, originalResume.template);
          
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ resume: duplicatedResume })
          };
        } catch (error) {
          console.error('Error duplicating resume:', error);
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to duplicate resume' })
          };
        }

      default:
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid action' })
        };
    }
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}