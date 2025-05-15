import { useQuery } from '@tanstack/react-query';
import { profileApi } from './api';

export function useProfile() {
	const {
		data: profile,
		error,
		isLoading
	} = useQuery({
		...profileApi.getUserProfile()
	});

	return { profile, error, isLoading };
}
