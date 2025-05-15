import { useQuery } from '@tanstack/react-query';
import { articleApi } from './api';

export function useSearchArticles(searchTerm: string) {
	const {
		data: articles,
		error,
		isLoading
	} = useQuery({
		...articleApi.searchArticles(searchTerm),
		enabled: searchTerm.length > 0 // запрос выполняется только если строка поиска не пуста
	});

	return { articles, error, isLoading };
}
