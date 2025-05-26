import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { articleApi } from './api';

export function useSearchArticles(
	searchTerm: string = '',
	tags: number[] = [],
	page: number = 1,
	count: number = 10,
	sort: number = 1
) {
	const { data, error, isLoading } = useQuery({
		...articleApi.searchArticles(searchTerm, tags, page, count, sort),
		placeholderData: keepPreviousData
	});

	return {
		articles: data?.data || [],
		totalPages: data?.max_pages || 1,
		error,
		isLoading
	};
}
