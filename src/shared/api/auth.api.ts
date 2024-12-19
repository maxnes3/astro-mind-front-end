import axios, { AxiosRequestConfig } from 'axios';
import { SignUpDto, SignInDto, AuthResponse } from '../types';

class ApiAuth {
  private readonly baseURL = import.meta.env.VITE_SERVER_URL;

  private getHeaders = (token?: string): AxiosRequestConfig => {
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  };

  signUp = async (data: SignUpDto): Promise<AuthResponse> => {
    try {
      const response = await axios.post<AuthResponse>(
        `${this.baseURL}/auth/signup`,
        data,
      );
      return response.data;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  signIn = async (data: SignInDto): Promise<AuthResponse> => {
    try {
      const response = await axios.post<AuthResponse>(
        `${this.baseURL}/auth/signin`,
        data,
      );
      return response.data;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  getFreshTokens = async (refreshToken: string): Promise<AuthResponse> => {
    try {
      const response = await axios.post<AuthResponse>(
        `${this.baseURL}/auth/signin/access-token`,
        {},
        this.getHeaders(refreshToken),
      );
      return response.data;
    } catch (error) {
      console.error('Error refreshing tokens:', error);
      throw error;
    }
  };

  logout = async (token: string): Promise<boolean> => {
    try {
      const response = await axios.post<boolean>(
        `${this.baseURL}/auth/logout`,
        {},
        this.getHeaders(token),
      );
      return response.data;
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };
}

const apiAuth = new ApiAuth();
export default apiAuth;
