// store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/reducer';
import productReducer from './Counter/reducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
