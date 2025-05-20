import { queryOptions } from '@tanstack/react-query';
import { jsonApiInstance } from '../../shared/api/api-instance';
import { IArticle } from './components/Article/Article.props';

export const articleApi = {
	baseKey: 'articles',

	getAllArticles: () => {
		return queryOptions({
			queryKey: [articleApi.baseKey, 'all'],
			queryFn: () => jsonApiInstance.get<IArticle[]>('/getPublicationsData').then((response) => response.data)
		});
	},

	searchArticles: (searchTerm: string, tags: number[]) => {
		return queryOptions({
			queryKey: [articleApi.baseKey, 'search', tags, searchTerm],
			queryFn: () =>
				jsonApiInstance
					.post<IArticle[]>('/get-publications-paginator', {
						title: searchTerm,
						tags: tags,
						first_id: 0,
						count: 10
					})
					.then((response) => response.data)
		});
	}
};
