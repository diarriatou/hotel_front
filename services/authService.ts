import api from './api';

interface LoginResponse {
  success: boolean;
  data?: {
    token: string;
    user: {
      _id: string;
      name: string;
      email: string;
    };
  };
  error?: string;
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Erreur de connexion'
      };
    }
  },

  async register(name: string, email: string, password: string) {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.error || 'Erreur lors de l\'inscription';
    }
  }
};