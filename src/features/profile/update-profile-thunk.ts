import { profileApi, ProfileDto } from './api';
import { AppThunk } from '../../shared/store';
import { queryClient } from '../../shared/api/query-client';

export const updateProfileThunk =
	(profileData: Partial<ProfileDto>): AppThunk =>
		async () => {
			try {
				await profileApi.updateUserProfile(profileData);

				// Инвалидируем кэш, чтобы обновить данные
				queryClient.invalidateQueries({
					queryKey: [profileApi.baseKey]
				});

				return true;
			} catch (error) {
				console.error('Ошибка при обновлении профиля', error);
				return false;
			}
		};
