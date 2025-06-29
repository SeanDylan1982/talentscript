export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export class AuthService {
  private static readonly SESSION_KEY = 'talentscript_user';
  private static readonly API_BASE = '/.netlify/functions';

  static async register(name: string, email: string, password: string): Promise<AuthUser> {
    try {
      const response = await fetch(`${this.API_BASE}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'register',
          name,
          email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      const authUser = data.user;
      this.setCurrentUser(authUser);
      return authUser;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  static async login(email: string, password: string): Promise<AuthUser> {
    try {
      const response = await fetch(`${this.API_BASE}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'login',
          email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      const authUser = data.user;
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