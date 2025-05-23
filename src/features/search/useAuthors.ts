import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { searchApi } from './api';

export function useAuthors(searchTerm: string = '') {
	const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
		...searchApi.getAuthors(searchTerm),
		placeholderData: keepPreviousData
	});

	// Преобразуем pages в плоский массив для удобства использования
	const authors = data?.pages.flat() || [];

	return {
		authors,
		error,
		isLoading,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage
	};
}
