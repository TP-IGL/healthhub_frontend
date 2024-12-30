import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[auth] Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[auth] Login Success',
  props<{ token: string }>()
);

export const loginFailure = createAction(
  '[auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[auth] Logout');
