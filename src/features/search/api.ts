import { queryOptions } from '@tanstack/react-query';
import { jsonApiInstance } from '../../shared/api/api-instance';
import { DataDto, IProfile } from '../../helpers/interfaces';

export const searchApi = {
	baseKey: 'search',

	getAuthors: (searchTerm: string = '', page: number = 1, count: number = 10, sort: number = 0) => {
		return queryOptions({
			queryKey: [searchApi.baseKey, 'authors', searchTerm],
			queryFn: () =>
				jsonApiInstance
					.post<DataDto<IProfile>>('/get-authors-paginator', {
						count: count,
						page: page,
						stroke: searchTerm,
						sort: sort
					})
					.then((response) => response.data)
		});
	},
	getTags: () => {
		return queryOptions({
			queryKey: [searchApi.baseKey, 'tags'],
			queryFn: () => jsonApiInstance.get('/tags').then((response) => response.data)
		});
	}
};
