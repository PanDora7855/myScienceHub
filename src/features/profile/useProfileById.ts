import { useQuery } from '@tanstack/react-query';
import { profileApi } from './api';

export function useProfileById(id: string) {
	const { data, error, isLoading } = useQuery({
		...profileApi.getUserProfileByIdQueryOptions(id)
	});

	return { data, error, isLoading };
}
