import { createReducer, on } from '@ngrx/store';
import { loginSuccess, loginFailure, logout } from './auth.actions';

export interface AuthState {
  token: string | null;
  error: string | null;
  isAuthenticated: boolean;
}

export const initialState: AuthState = {
  token: null,
  error: null,
  isAuthenticated: false,
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { token }) => {
    return {
      ...state,
      token,
      isAuthenticated: true,
      error: null,
    };
  }),
  on(loginFailure, (state, { error }) => {
    return {
      ...state,
      error,
      isAuthenticated: false,
    };
  }),
  on(logout, (state) => {
    return {
      ...state,
      token: null,
      isAuthenticated: false,
    };
  })
);
