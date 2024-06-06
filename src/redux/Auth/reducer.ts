// reducer.ts
import { createReducer } from '@reduxjs/toolkit';
import { setAuth, clearAuth, AuthData } from './actions';

type AuthState = {
  authData: AuthData | null;
}

const initialState: AuthState = {
  authData: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!) : null,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAuth, (state, action) => {
      localStorage.setItem('auth', JSON.stringify(action.payload));
      state.authData = action.payload;
    })
    .addCase(clearAuth, (state) => {
      localStorage.removeItem('auth');
      state.authData = null;
    });
});

export default authReducer;
