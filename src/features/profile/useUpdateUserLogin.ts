import { useMutation } from '@tanstack/react-query';
import { profileApi } from './api';
import { AxiosError } from 'axios';
import { ApiErrorResponse } from './useUpdateUserPassword';

export function useUpdateUserLogin() {
	const sendVerificationMutation = useMutation({
		mutationFn: (login: string) => profileApi.sendVerificationCodeForLogin(login),

		onSuccess: () => {
			console.log('Код подтверждения для смены логина отправлен успешно');
		},

		onError: (error) => {
			console.error('Ошибка при отправке кода подтверждения для логина:', error);
		}
	});

	const sendVerificationLoginCode = (login: string) => {
		sendVerificationMutation.mutate(login);
	};

	return {
		sendVerificationLoginCode,
		isLoading: sendVerificationMutation.isPending,
		isSuccess: sendVerificationMutation.isSuccess,
		error: sendVerificationMutation.error as AxiosError<ApiErrorResponse>
	};
}
