import { useQuery } from '@tanstack/react-query';
import { profileApi } from './api';

export function useProfilePublications() {
	const {
		data: publications,
		error,
		isLoading
	} = useQuery({
		...profileApi.getUserPublicationsQueryOptions()
	});

	return { publications, error, isLoading };
}
