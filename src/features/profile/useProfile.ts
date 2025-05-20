import { useQuery } from '@tanstack/react-query';
import { profileApi } from './api';

export function useProfile() {
	const { data, error, isLoading } = useQuery({
		...profileApi.getUserQueryOptions()
	});

	return { data, error, isLoading };
}
