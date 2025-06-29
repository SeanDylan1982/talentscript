import { useUser } from '@stackframe/react';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export function useAuth() {
  const { user, signIn, signUp, signOut } = useUser();

  const authUser: AuthUser | null = user ? {
    id: user.id,
    email: user.primaryEmail || '',
    name: user.displayName || user.primaryEmail || 'User'
  } : null;

  const login = async (email: string, password: string): Promise<void> => {
    try {
      await signIn.emailPassword({ email, password });
    } catch (error) {
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    try {
      await signUp.emailPassword({ 
        email, 
        password,
        displayName: name
      });
    } catch (error) {
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    user: authUser,
    isLoading: false, // Stack Auth handles loading states internally
    isAuthenticated: !!user,
    login,
    register,
    logout
  };
}