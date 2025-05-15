import { useQuery } from '@tanstack/react-query';
import { articleApi } from './api';

export function useArticles() {
	const {
		data: articles,
		error,
		isLoading
	} = useQuery({
		...articleApi.getAllArticles()
	});

	return { articles, error, isLoading };
}
