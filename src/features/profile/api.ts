import { queryOptions } from '@tanstack/react-query';
import { jsonApiInstance } from '../../shared/api/api-instance';
import { IArticles } from '../../components/Article/Article.props';
import { AxiosError } from 'axios';
import { IOmitData } from '../../pages/Settings/SettingsAbout/SettingsAbout.props';

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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	SubscribersList: any[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	MySubscribesList: any[];
};

export const profileApi = {
	baseKey: 'profile',

	getUserProfileQueryOptions: () => {
		return queryOptions({
			queryKey: [profileApi.baseKey, 'userData'],
			queryFn: () => jsonApiInstance.get<ProfileDto>('/getUserData').then((response) => response.data)
		});
	},
	getUserProfileByIdQueryOptions: (id: string) => {
		return queryOptions({
			queryKey: [profileApi.baseKey, 'userData', id],
			queryFn: () => jsonApiInstance.get(`/profiles/id/${id}`).then((response) => response.data.Profile)
		});
	},

	getUserPublicationsQueryOptions: () => {
		return queryOptions({
			queryKey: [profileApi.baseKey, 'publications'],
			queryFn: () =>
				jsonApiInstance.get<ProfileDto>('/getUserData').then((response) => response.data.Publications)
		});
	},
	getUserPublicationsByIdQueryOptions: (id: string) => {
		return queryOptions({
			queryKey: [profileApi.baseKey, 'publications', id],
			queryFn: () =>
				jsonApiInstance.get(`/profiles/id/${id}`).then((response) => response.data.Profile.Publications)
		});
	},

	updateUserProfile: async (data: IOmitData) => {
		return jsonApiInstance
			.patch('/profiles', data)
			.then((response) => response.data)
			.catch((e: AxiosError) => console.log(e.response?.data));
	}
};
