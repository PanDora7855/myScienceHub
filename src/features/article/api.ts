import { queryOptions } from '@tanstack/react-query';
import { jsonApiInstance } from '../../shared/api/api-instance';
import { IArticle, DataDto } from '../../helpers/interfaces';

export const articleApi = {
	baseKey: 'articles',

	getAllArticles: () => {
		return queryOptions({
			queryKey: [articleApi.baseKey, 'all'],
			queryFn: () => jsonApiInstance.get<IArticle[]>('/getPublicationsData').then((response) => response.data)
		});
	},

	// TODO Попросил даню возвращать hasNextPage
	searchArticles: (searchTerm: string, tags: number[], page: number = 1, count: number = 10, sort: number = 0) => {
		return queryOptions({
			queryKey: [articleApi.baseKey, 'search', tags, searchTerm],
			// TODO тут я попросил даню добавить id автора
			queryFn: () =>
				jsonApiInstance
					.post<DataDto<IArticle>>('/get-publications-paginator', {
						title: searchTerm,
						tags: tags,
						page: page,
						count: count,
						sort: sort
					})
					.then((response) => response.data)
		});
	},

	getArticleById: (id: string) => {
		return queryOptions({
			queryKey: [articleApi.baseKey, 'edit', id],
			queryFn: () => jsonApiInstance.get<IArticle>(`/update-publication/${id}`).then((response) => response.data)
		});
	},

	createPublication: (formData: FormData) => {
		return jsonApiInstance.post('/create-publication', formData).then((response) => response.data);
	},

	updatePublication: (formData: FormData) => {
		return jsonApiInstance.patch('/update-publication', formData).then((response) => response.data);
	},

	deletePublication: (id: number) => {
		return jsonApiInstance.delete(`/delete-publication/${id}`).then((response) => response.data);
	}
};
