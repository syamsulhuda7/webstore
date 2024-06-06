// action.ts
import { createAction } from '@reduxjs/toolkit';
import { SET_AUTH, CLEAR_AUTH } from "./constants";

export interface AuthData {
  token: string;
  username: string;
  isLogin: boolean;
}

// Membuat action dengan createAction
export const setAuth = createAction<AuthData>(SET_AUTH);
export const clearAuth = createAction(CLEAR_AUTH);
