import { createReducer, on } from '@ngrx/store';
import { loginSuccess, loginFailure, logout } from './auth.actions';

export interface AuthState {
  token: string | null;
  error: string | null;
  isAuthenticated: boolean;
  username : string | null  ; 
  role : string | null ; 
  id : string | null ; 
  email : string | null ; 
  centre_hospitalier_id : string | null ; 
}

// Helper function to safely access localStorage
const getLocalStorageState = (): Partial<AuthState> => {
  if (typeof localStorage === 'undefined') {
    return {}; // Fallback for environments where localStorage is not available
  }
  return JSON.parse(localStorage.getItem('authState') || '{}');
};

// Load initial state from localStorage (if available)
const savedState = getLocalStorageState();

export const initialState: AuthState = {
  token: savedState.token || null,
  error: savedState.error || null,
  isAuthenticated: savedState.isAuthenticated || false,
  username: savedState.username || null,
  role: savedState.role || null,
  id: savedState.id || null,
  email: savedState.email || null,
  centre_hospitalier_id : savedState.centre_hospitalier_id|| null
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { token, username, role, id, email , centre_hospitalier_id }) => {
    const newState = {
      ...state,
      token,
      username,
      role,
      id,
      email,
      centre_hospitalier_id , 
      isAuthenticated: true,
      error: null,
  
    };
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('authState', JSON.stringify(newState));
    }
    return newState;
  }),
  on(loginFailure, (state, { error }) => {
    const newState = {
      ...state,
      error,
      isAuthenticated: false,
    };
    // Persist new state to localStorage (only in browser)
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('authState', JSON.stringify(newState));
    }
    return newState;
  }),
  on(logout, (state) => {
    const newState = {
      ...state,
      token: null,
      isAuthenticated: false,
    };
    // Clear state from localStorage (only in browser)
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('authState');
    }
    return newState;
  })
);
