import { removeUser } from './auth.slice';
import { queryClient } from '../../shared/api/query-client';
import { AppThunk } from '../../shared/store';
import { authApi } from './api';
import { profileApi } from '../profile/api';

export const logoutThunk = (): AppThunk<Promise<boolean>> => async (dispatch) => {
	try {
		await authApi.logout();
		dispatch(removeUser());

		// Очищаем кэш запросов, связанных с авторизацией
		queryClient.removeQueries({ queryKey: [authApi.baseKey] });

		queryClient.invalidateQueries({ queryKey: [profileApi.baseKey] });

		// Очищаем cookie (можно добавить более конкретный код для удаления jwt-cookie)
		document.cookie = 'auth_token=; max-age=0; path=/;';

		return true;
	} catch (error) {
		console.error('Ошибка при выходе из системы', error);
		return false;
	}
};
