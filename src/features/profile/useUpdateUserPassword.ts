import { useMutation } from '@tanstack/react-query';
import { profileApi } from './api';
import { AxiosError } from 'axios';

export interface ApiErrorResponse {
	error: string;
	message?: string;
	status?: number;
}

export function useUpdateUserPassword() {
	const sendVerificationMutation = useMutation({
		mutationFn: profileApi.sendVerificationCodeForPassword,

		onSuccess: () => {
			console.log('Verification code sent successfully');
		},

		onError: (error) => {
			console.error('Error sending verification code:', error);
		}
	});

	const sendVerificationPasswordCode = (login: string) => {
		sendVerificationMutation.mutate(login);
	};

	return {
		sendVerificationPasswordCode,
		isLoading: sendVerificationMutation.isPending,
		isSuccess: sendVerificationMutation.isSuccess,
		error: sendVerificationMutation.error as AxiosError<ApiErrorResponse>
	};
}
