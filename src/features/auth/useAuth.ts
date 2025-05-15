import { useAppDispatch, useAppSelector } from '../../shared/store';
import { selectIsAuthenticated, selectLoginError, selectUser } from './auth.slice';
import { loginThunk } from './login-thunk';
import { logoutThunk } from './logout-thunk';
import { useCallback } from 'react';

export function useAuth() {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const loginError = useAppSelector(selectLoginError);

	const login = useCallback(
		(login: string, password: string) => {
			return dispatch(loginThunk(login, password));
		},
		[dispatch]
	);

	const logout = useCallback(() => {
		return dispatch(logoutThunk());
	}, [dispatch]);

	return {
		user,
		isAuthenticated,
		loginError,
		login,
		logout
	};
}
