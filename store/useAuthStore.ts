import { isAxiosError } from 'axios';
import { create } from 'zustand';

import {
  loginUser,
  logoutUser,
  refreshAuthToken,
  requestOtp as requestOtpService,
  signupUser,
  verifyOtp as verifyOtpService,
  type LoginPayload,
  type OtpRequestPayload,
  type OtpVerifyPayload,
  type CompleteSignupPayload,
} from '@/services/auth';

type AuthUser = Record<string, unknown> | null;

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: AuthUser;
  loading: boolean;
  error: string | null;
  setTokens: (payload: {
    token?: string | null;
    refreshToken?: string | null;
    user?: AuthUser;
  }) => void;
  clearSession: () => void;
  setError: (message: string | null) => void;
  login: (payload: LoginPayload) => Promise<void>;
  registerUser: (payload: OtpRequestPayload) => Promise<unknown>;
  completeSignup: (payload: CompleteSignupPayload) => Promise<void>;
  refreshSession: () => Promise<void>;
  logout: () => Promise<void>;
  requestOtp: (payload: OtpRequestPayload) => Promise<unknown>;
  verifyOtp: (payload: OtpVerifyPayload) => Promise<unknown>;
  fetchToken: () => Promise<void>;
}

type NormalizedAuthPayload = Pick<AuthState, 'token' | 'refreshToken' | 'user'>;

const initialState: NormalizedAuthPayload &
  Pick<AuthState, 'loading' | 'error'> = {
  token: null,
  refreshToken: null,
  user: null,
  loading: false,
  error: null,
};

const unwrapPayload = (payload: unknown): Record<string, unknown> | null => {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const candidate = payload as Record<string, unknown>;
  const nested = candidate.data;

  if (nested && typeof nested === 'object') {
    return nested as Record<string, unknown>;
  }

  return candidate;
};

const normalizeAuthPayload = (payload: unknown): NormalizedAuthPayload => {
  const source = unwrapPayload(payload);

  if (!source) {
    return { token: null, refreshToken: null, user: null };
  }

  const token =
    typeof source.token === 'string'
      ? source.token
      : typeof source.accessToken === 'string'
        ? source.accessToken
        : null;

  const refreshToken =
    typeof source.refreshToken === 'string' ? source.refreshToken : null;

  const user =
    source.user && typeof source.user === 'object'
      ? (source.user as Record<string, unknown>)
      : null;

  return { token, refreshToken, user };
};

const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    const responseMessage =
      (error.response?.data as { message?: unknown } | undefined)?.message ??
      error.message;

    return typeof responseMessage === 'string'
      ? responseMessage
      : 'Request failed';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Unexpected error';
};

export const useAuthStore = create<AuthState>((set, get) => ({
  ...initialState,
  setTokens: ({ token, refreshToken, user }) =>
    set((state) => ({
      ...state,
      token: token ?? state.token,
      refreshToken: refreshToken ?? state.refreshToken,
      user: user === undefined ? state.user : user,
    })),
  registerUser: async (payload) => {
    set({ loading: true, error: null });
    try {
      const data = await requestOtpService(payload);
      set({ loading: false, error: null });
      return data;
    } catch (error) {
      set({ loading: false, error: getErrorMessage(error) });
      throw error;
    }
  },
  completeSignup: async (payload) => {
    set({ loading: true, error: null });
    try {
      const data = await signupUser(payload);
      const normalized = normalizeAuthPayload(data);
      set({ ...normalized, loading: false, error: null });
    } catch (error) {
      set({ loading: false, error: getErrorMessage(error) });
      throw error;
    }
  },
  clearSession: () => set({ ...initialState }),
  setError: (message) => set({ error: message }),
  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const data = await loginUser(credentials);
      const normalized = normalizeAuthPayload(data);
      set({ ...normalized, loading: false, error: null });
    } catch (error) {
      set({ loading: false, error: getErrorMessage(error) });
      throw error;
    }
  },
  refreshSession: async () => {
    const refreshToken = get().refreshToken;
    if (!refreshToken) {
      return;
    }

    set({ loading: true, error: null });
    try {
      const data = await refreshAuthToken({ refreshToken });
      const normalized = normalizeAuthPayload(data);
      set({ ...normalized, loading: false, error: null });
    } catch (error) {
      set({ loading: false, error: getErrorMessage(error) });
      throw error;
    }
  },
  logout: async () => {
    const { refreshToken, token } = get();
    try {
      if (refreshToken) {
        await logoutUser({ refreshToken }, token);
      }
    } catch (error) {
      console.warn('Failed to logout:', error);
    } finally {
      set({ ...initialState });
    }
  },
  requestOtp: (payload) => requestOtpService(payload),
  verifyOtp: (payload) => verifyOtpService(payload),
  fetchToken: async () => {
    await get().refreshSession();
  },
}));
