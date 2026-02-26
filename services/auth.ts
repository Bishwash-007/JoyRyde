import axiosInstance from '@/lib/axiosInstance';
import type { AxiosRequestConfig } from 'axios';

export interface SignupPayload {
  email: string;
  password?: string;
  phoneNumber?: string;
  role?: string;
}

export interface CompleteSignupPayload {
  email: string;
  password: string;
  profile: {
    name?: string;
    phone?: string;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface OtpRequestPayload {
  email: string;
}

export interface OtpVerifyPayload {
  email: string;
  code: string;
}

export interface RefreshPayload {
  refreshToken: string;
}

export interface LogoutPayload extends RefreshPayload {}

export interface BiometricPayload {
  userId: string;
  deviceId: string;
}

const post = async <T>(
  url: string,
  payload?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  const { data } = await axiosInstance.post<T>(url, payload, config);
  return data;
};

export const signupUser = (payload: CompleteSignupPayload) =>
  post('/auth/otp/complete', payload);

export const requestOtp = (payload: OtpRequestPayload) =>
  post('/auth/otp/request', payload);

export const verifyOtp = (payload: OtpVerifyPayload) =>
  post('/auth/otp/verify', payload);

export const registerUser = (payload: OtpRequestPayload) => requestOtp(payload);

export const loginUser = (payload: LoginPayload) =>
  post('/auth/login', payload);

export const refreshAuthToken = (payload: RefreshPayload) =>
  post('/auth/refresh', payload);

export const logoutUser = (payload: LogoutPayload, token?: string | null) =>
  post(
    '/auth/logout',
    payload,
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : undefined
  );

export const biometricLogin = (payload: BiometricPayload) =>
  post('/auth/biometric', payload);
