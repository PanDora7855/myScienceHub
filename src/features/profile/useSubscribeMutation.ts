import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from './api';

export function useSubscribeMutation(profileId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => profileApi.subscribeToUser(profileId),
		onSuccess: () => {
			// Инвалидируем кэш профиля, чтобы он заново запрашивался
			queryClient.invalidateQueries({
				queryKey: ['profile', 'userData', profileId]
			});
		}
	});
}

export function useUnsubscribeMutation(profileId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => profileApi.unsubscribeFromUser(profileId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['profile', 'userData', profileId]
			});
		}
	});
}
