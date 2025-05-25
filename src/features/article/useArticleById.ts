import { useQuery } from '@tanstack/react-query';
import { articleApi } from './api';

export function useArticleById(id: string) {
	const { data, error, isLoading } = useQuery({
		...articleApi.getArticleById(id),
		enabled: !!id
	});

	return { data, error, isLoading };
}
