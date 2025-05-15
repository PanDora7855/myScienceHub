import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDto } from './api';

type AuthState = {
	user: UserDto | null;
	isAuthenticated: boolean;
	loginError: string | null;
};

const initialState: AuthState = {
	user: null,
	isAuthenticated: document.cookie.includes('auth_token'),
	loginError: null
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<UserDto>) {
			state.user = action.payload;
			state.isAuthenticated = true;
			state.loginError = null;
		},
		removeUser(state) {
			state.user = null;
			state.isAuthenticated = false;
		},
		setLoginError(state, action: PayloadAction<string>) {
			state.loginError = action.payload;
		},
		clearLoginError(state) {
			state.loginError = null;
		}
	}
});

export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectLoginError = (state: { auth: AuthState }) => state.auth.loginError;

export const { setUser, removeUser, setLoginError, clearLoginError } = authSlice.actions;

export default authSlice.reducer;
