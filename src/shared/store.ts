import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth.slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ThunkAction } from '@reduxjs/toolkit';
import { Action } from 'redux';

export const store = configureStore({
	reducer: {
		auth: authReducer
	},

	middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<R = void> = ThunkAction<R, AppState, unknown, Action<string>>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
