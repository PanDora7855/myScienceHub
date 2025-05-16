import { queryOptions } from '@tanstack/react-query';
import { jsonApiInstance } from '../../shared/api/api-instance';
import { IArticles } from '../../components/Article/Article.props';

export type ProfileDto = {
	id: number;
	login: string;
	first_name: string;
	last_name: string;
	middle_name: string;
	academic_degree: string;
	vac: string;
	appointment: string;
	country: string;
	Publications: IArticles[];
	SubscribersList: any[];
	MySubscribesList: any[];
};

export const profileApi = {
	baseKey: 'profile',

	getUserProfile: () => {
		return queryOptions({
			queryKey: [profileApi.baseKey, 'userData'],
			queryFn: () => jsonApiInstance.get<ProfileDto>('/getUserData').then((response) => response.data)
		});
	},
	getUserProfileById: (id: string) => {
		return queryOptions({
			queryKey: [profileApi.baseKey, 'userData', id],
			queryFn: () => jsonApiInstance.get(`/profiles/id/${id}`).then((response) => response.data.Profile)
		});
	},

	getUserPublications: () => {
		return queryOptions({
			queryKey: [profileApi.baseKey, 'publications'],
			queryFn: () =>
				jsonApiInstance.get<ProfileDto>('/getUserData').then((response) => response.data.Publications)
		});
	},
	getUserPublicationsById: (id: string) => {
		return queryOptions({
			queryKey: [profileApi.baseKey, 'publications', id],
			queryFn: () =>
				jsonApiInstance.get(`/profiles/id/${id}`).then((response) => response.data.Profile.Publications)
		});
	}
};
