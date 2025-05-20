import { queryOptions } from '@tanstack/react-query';
import { jsonApiInstance } from '../../shared/api/api-instance';
import { IArticle } from '../article/components/Article/Article.props';
import { AxiosError } from 'axios';
import { IOmitData } from './components/SettingsAbout/SettingsAbout.props';

export type ProfileDto = {
	id: number;
	login: string;
	password: string;
	first_name: string;
	last_name: string;
	middle_name: string;
	academic_degree: string;
	vac: string;
	appointment: string;
	country: string;
	Publications: IArticle[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	SubscribersList: any[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	MySubscribesList: any[];
};

export const profileApi = {
	baseKey: 'profile',

	getUserQueryOptions: () => {
		return queryOptions({
			queryKey: [profileApi.baseKey, 'userData'],
			queryFn: () => jsonApiInstance.get<ProfileDto>('/getUserData').then((response) => response.data)
		});
	},
	getUserProfileByIdQueryOptions: (id: string) => {
		return queryOptions({
			queryKey: [profileApi.baseKey, 'userData', id],
			queryFn: () => jsonApiInstance.get(`/profiles/id/${id}`).then((response) => response.data)
		});
	},

	updateUserProfile: async (data: IOmitData) => {
		return jsonApiInstance
			.patch('/profiles', data)
			.then((response) => response.data)
			.catch((e: AxiosError) => {
				console.log(e.response?.data);
				throw e;
			});
	},

	sendVerificationCodeForLogin: async (login: string) => {
		return await jsonApiInstance
			.post('/send-verification-code-for-change-email', { login })
			.then((response) => response.data)
			.catch((e: AxiosError) => {
				console.log(e.response?.data);
				throw e;
			});
	},

	confirmUserLogin: async (login: string, code: string) => {
		return await jsonApiInstance
			.post('/settings/verify-and-change-email', { login, code })
			.then((response) => response.data)
			.catch((e: AxiosError) => {
				console.log(e);
				throw e;
			});
	},

	sendVerificationCodeForPassword: async (login: string) => {
		return await jsonApiInstance
			.post('/send-verification-code-for-change-password', { login })
			.then((response) => response.data)
			.catch((e: AxiosError) => {
				console.log(e.response?.data);
				throw e;
			});
	},

	confirmUserPassword: async (code: string, password: string) => {
		return await jsonApiInstance
			.post('/settings/verify-and-change-password', { code, password })
			.then((response) => response.data)
			.catch((e: AxiosError) => {
				console.log(e.response?.data);
				throw e;
			});
	}
};
