import { infiniteQueryOptions } from '@tanstack/react-query';
import { jsonApiInstance } from '../../shared/api/api-instance';

export const searchApi = {
	baseKey: 'search',

	getAuthors: (searchTerm: string = '') => {
		return infiniteQueryOptions({
			queryKey: [searchApi.baseKey, 'authors', searchTerm],
			queryFn: ({ pageParam }) =>
				jsonApiInstance
					.post('/get-authors-paginator', {
						count: 10,
						first_id: pageParam * 10,
						stroke: searchTerm
					})
					.then((response) => response.data),
			initialPageParam: 0,
			getNextPageParam: (lastPage) => lastPage.nextId ?? undefined
		});
	}
};
