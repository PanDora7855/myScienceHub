import { useQuery } from '@tanstack/react-query';
import { profileApi } from './api';

export function useProfilePublicationsById(id: string) {
	return useQuery({
		...profileApi.getUserPublicationsByIdQueryOptions(id)
	});
}
