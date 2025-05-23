import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { articleApi } from './api';

export function useSearchArticles(searchTerm: string = '', tags: number[] = []) {
	const {
		data: articles,
		error,
		isLoading
	} = useQuery({
		...articleApi.searchArticles(searchTerm, tags),
		placeholderData: keepPreviousData
	});

	return { articles, error, isLoading };
}
