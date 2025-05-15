import { authApi } from './api';
import { setLoginError, setUser } from './auth.slice';
import { queryClient } from '../../shared/api/query-client';
import { AppThunk } from '../../shared/store';
import { jsonApiInstance } from '../../shared/api/api-instance';

export const loginThunk =
	(login: string, password: string): AppThunk<Promise<boolean>> =>
	async (dispatch) => {
		try {
			await authApi.login(login, password);

			// После успешного логина получаем данные пользователя
			const userData = await jsonApiInstance.get('/getUserData').then((response) => response.data);

			dispatch(setUser(userData));

			// Добавляем данные в кэш React Query
			queryClient.setQueryData(authApi.getUserData().queryKey, userData);

			return true;
		} catch {
			dispatch(setLoginError('Произошла ошибка при входе'));
			return false;
		}
	};
