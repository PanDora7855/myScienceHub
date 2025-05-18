import { queryOptions } from '@tanstack/react-query';
import { jsonApiInstance } from '../../shared/api/api-instance';
import { IArticles } from './components/Article/Article.props';

export const articleApi = {
	baseKey: 'articles',

	getAllArticles: () => {
		return queryOptions({
			queryKey: [articleApi.baseKey, 'all'],
			queryFn: () => jsonApiInstance.get<IArticles[]>('/getPublicationsData').then((response) => response.data)
		});
	},

	searchArticles: (searchTerm: string) => {
		return queryOptions({
			queryKey: [articleApi.baseKey, 'search', searchTerm],
			queryFn: () =>
				jsonApiInstance
					.post<IArticles[]>('/get-publications-paginator', {
						title: searchTerm,
						tags: [],
						first_id: 0,
						count: 2
					})
					.then((response) => response.data)
		});
	}
};
