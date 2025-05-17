import { useQuery } from '@tanstack/react-query';
import { profileApi } from './api';

export function useProfilePublicationsById(id: string) {
	const {
		data: publications,
		error,
		isLoading
	} = useQuery({
		...profileApi.getUserPublicationsByIdQueryOptions(id)
	});

	return { publications, error, isLoading };
}
