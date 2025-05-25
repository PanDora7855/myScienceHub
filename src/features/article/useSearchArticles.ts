import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { articleApi } from './api';

export function useSearchArticles(
	searchTerm: string = '',
	tags: number[] = [],
	page: number = 1,
	count: number = 10,
	sort: number = 0
) {
	const {
		data: articles,
		error,
		isLoading
	} = useQuery({
		...articleApi.searchArticles(searchTerm, tags, page, count, sort),
		placeholderData: keepPreviousData,
		select: (data) => data.data
	});

	return { articles, error, isLoading };
}
