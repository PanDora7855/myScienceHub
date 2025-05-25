import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { profileApi } from './api';

export function useSubscribes(searchTerm: string = '', count: number = 10, page: number = 1) {
	const { data, error, isLoading } = useQuery({
		...profileApi.getSubscribes(searchTerm, page, count),
		placeholderData: keepPreviousData
	});

	const subscribes = data?.data.flat() || [];

	return {
		subscribes,
		error,
		isLoading
	};
}
