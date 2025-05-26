import { queryOptions } from '@tanstack/react-query';
import { jsonApiInstance } from '../../shared/api/api-instance';
import { AxiosError } from 'axios';

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

	login: async (login: string, password: string) => {
		return await jsonApiInstance.post('/login', `login=${login}&password=${password}`);
	},

	logout: () => {
		return jsonApiInstance('/logout');
	},

	// Новые методы для регистрации
	sendVerificationCodeForRegister: async (login: string) => {
		return await jsonApiInstance
			.post('/send-verification-code-for-register', { login })
			.then((response) => response.data)
			.catch((e: AxiosError) => {
				console.log(e.response?.data);
				throw e;
			});
	},

	register: async (data: RegisterData) => {
		return await jsonApiInstance
			.post('/register', data)
			.then((response) => response.data)
			.catch((e: AxiosError) => {
				console.log(e.response?.data);
				throw e;
			});
	}
};

// Типы для регистрации
export interface RegisterData {
	code: string;
	profile: {
		login: string;
		first_name: string;
		last_name: string;
		password: string;
	};
}

export interface RegisterFormData {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	confirmPassword: string;
	verificationCode: string;
}
