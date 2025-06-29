import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL || '');

interface AuthUser {
  id: string;
  email: string;
  name: string;
}

interface DatabaseUser {
  id: string;
  email: string;
  name: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

// Simple password hashing
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'talentscript_salt');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function createUser(email: string, name: string, passwordHash: string): Promise<DatabaseUser> {
  const result = await sql`
    INSERT INTO users (email, name, password_hash)
    VALUES (${email}, ${name}, ${passwordHash})
    RETURNING id, email, name, password_hash, created_at, updated_at
  `;
  return result[0] as DatabaseUser;
}

async function getUserByEmail(email: string): Promise<DatabaseUser | null> {
  const result = await sql`
    SELECT id, email, name, password_hash, created_at, updated_at
    FROM users 
    WHERE email = ${email}
  `;
  return result[0] as DatabaseUser || null;
}

async function initializeDatabase(): Promise<void> {
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
    // Initialize database on first request
    await initializeDatabase();

    const { action, email, password, name } = JSON.parse(event.body || '{}');

    switch (action) {
      case 'register':
        try {
          // Check if user already exists
          const existingUser = await getUserByEmail(email);
          if (existingUser) {
            return {
              statusCode: 400,
              headers,
              body: JSON.stringify({ error: 'User already exists with this email' })
            };
          }

          // Hash password and create user
          const passwordHash = await hashPassword(password);
          const user = await createUser(email, name, passwordHash);
          
          const authUser: AuthUser = {
            id: user.id,
            email: user.email,
            name: user.name
          };
          
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ user: authUser })
          };
        } catch (error) {
          console.error('Registration error:', error);
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Registration failed' })
          };
        }

      case 'login':
        try {
          // Get user from database
          const user = await getUserByEmail(email);
          if (!user) {
            return {
              statusCode: 401,
              headers,
              body: JSON.stringify({ error: 'Invalid email or password' })
            };
          }

          // Verify password
          const passwordHash = await hashPassword(password);
          if (user.password_hash !== passwordHash) {
            return {
              statusCode: 401,
              headers,
              body: JSON.stringify({ error: 'Invalid email or password' })
            };
          }
          
          const authUser: AuthUser = {
            id: user.id,
            email: user.email,
            name: user.name
          };
          
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ user: authUser })
          };
        } catch (error) {
          console.error('Login error:', error);
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Login failed' })
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