import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[auth] Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[auth] Login Success',
  props<{ token: string ,  username : string , role : string , id : string, email : string , centre_hospitalier_id:string }>()
);

export const loginFailure = createAction(
  '[auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[auth] Logout');
