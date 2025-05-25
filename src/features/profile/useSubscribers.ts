import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { profileApi } from './api';

export function useSubscribers(searchTerm: string = '') {
	const { data, error, isLoading } = useQuery({
		...profileApi.getSubscribers(searchTerm),
		placeholderData: keepPreviousData
	});

	// Преобразуем pages в плоский массив для удобства использования
	const subscribers = data?.data.flat() || [];

	return {
		subscribers,
		error,
		isLoading
	};
}
