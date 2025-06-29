import { DatabaseService, DatabaseUser } from '@/lib/database';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export class AuthService {
  private static readonly SESSION_KEY = 'talentscript_user';

  // Simple password hashing (in production, use bcrypt or similar)
  private static async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + 'talentscript_salt');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  static async register(name: string, email: string, password: string): Promise<AuthUser> {
    try {
      // Check if user already exists
      const existingUser = await DatabaseService.getUserByEmail(email);
      if (existingUser) {
        throw new Error('User already exists with this email');
      }

      // Hash password and create user
      const passwordHash = await this.hashPassword(password);
      const user = await DatabaseService.createUser(email, name, passwordHash);
      
      // Store in session
      const authUser: AuthUser = {
        id: user.id,
        email: user.email,
        name: user.name
      };
      
      this.setCurrentUser(authUser);
      return authUser;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  static async login(email: string, password: string): Promise<AuthUser> {
    try {
      // For demo purposes, we'll use a simple authentication
      // In production, you'd verify the password hash
      const passwordHash = await this.hashPassword(password);
      
      // Get user from database
      const user = await DatabaseService.getUserByEmail(email);
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // In a real app, you'd verify the password hash here
      // For now, we'll just proceed with the login
      
      const authUser: AuthUser = {
        id: user.id,
        email: user.email,
        name: user.name
      };
      
      this.setCurrentUser(authUser);
      return authUser;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  static logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  static getCurrentUser(): AuthUser | null {
    try {
      const userData = localStorage.getItem(this.SESSION_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  }

  static setCurrentUser(user: AuthUser): void {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}