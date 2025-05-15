import { queryOptions } from '@tanstack/react-query';
import { jsonApiInstance } from '../../shared/api/api-instance';

export type UserDto = {
	id: number;
	login: string;
	first_name: string;
	last_name: string;
	middle_name: string;
	academic_degree: string;
	vac: string;
	appointment: string;
	country: string;
};

export const authApi = {
	baseKey: 'auth',

	getUserData: () => {
		return queryOptions({
			queryKey: [authApi.baseKey, 'userData'],
			queryFn: () => jsonApiInstance.get<UserDto>('/getUserData').then((response) => response.data)
		});
	},

	login: (login: string, password: string) => {
		return jsonApiInstance.post('/login', `login=${login}&password=${password}`);
	},

	logout: () => {
		return jsonApiInstance('/logout');
	}
};
