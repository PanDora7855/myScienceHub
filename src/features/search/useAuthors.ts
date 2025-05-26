import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { searchApi } from './api';

export function useAuthors(searchTerm = '', page = 1, count = 10, sort = 0) {
	const { data, error, isLoading } = useQuery({
		...searchApi.getAuthors(searchTerm, page, count, sort),
		placeholderData: keepPreviousData
	});

	const authors = data?.data || [];
	const totalPages = data?.max_pages || 1;

	return {
		authors,
		totalPages,
		error,
		isLoading
	};
}
