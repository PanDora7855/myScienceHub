import { queryOptions } from '@tanstack/react-query';
import { jsonApiInstance } from '../../shared/api/api-instance';
import { AxiosError } from 'axios';
import { IOmitData } from './components/SettingsAbout/SettingsAbout.props';
import { DataDto, IAnotherProfile, IProfile } from '../../helpers/interfaces';

export const profileApi = {
	baseKey: 'profile',

	getUserQueryOptions: () => {
		return queryOptions({
			queryKey: [profileApi.baseKey, 'userData'],
			queryFn: () => jsonApiInstance.get<IProfile>('/getUserData').then((response) => response.data)
		});
	},
	getUserProfileByIdQueryOptions: (id: string) => {
		return queryOptions({
			queryKey: [profileApi.baseKey, 'userData', id],
			queryFn: () => jsonApiInstance.get<IAnotherProfile>(`/profiles/id/${id}`).then((response) => response.data)
		});
	},

	getSubscribes: (searchTerm: string = '', page: number = 1, count: number = 10) => {
		return queryOptions({
			queryKey: [profileApi.baseKey, 'subscribes', searchTerm],
			queryFn: () =>
				jsonApiInstance
					.post<DataDto<IProfile>>('/get-subscribes-paginator', {
						count: count,
						page: page,
						stroke: searchTerm
					})
					.then((response) => response.data)
		});
	},

	getSubscribers: (searchTerm: string = '', page: number = 1, count: number = 10) => {
		return queryOptions({
			queryKey: [profileApi.baseKey, 'subscribers', searchTerm],
			queryFn: () =>
				jsonApiInstance
					.post<DataDto<IProfile>>('/get-subscribers-paginator', {
						count: count,
						page: page,
						stroke: searchTerm
					})
					.then((response) => response.data)
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
