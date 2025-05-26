import { useMutation } from '@tanstack/react-query';
import { authApi, RegisterData } from './api';
import { AxiosError } from 'axios';

interface ApiErrorResponse {
	error: string;
	message?: string;
	status?: number;
}

export function useSendVerificationCode() {
	const sendVerificationMutation = useMutation({
		mutationFn: (email: string) => authApi.sendVerificationCodeForRegister(email),

		onSuccess: () => {
			console.log('Код подтверждения для регистрации отправлен успешно');
		},

		onError: (error: AxiosError<ApiErrorResponse>) => {
			console.error('Ошибка при отправке кода подтверждения:', error);
		}
	});

	const sendVerificationCode = (email: string) => {
		sendVerificationMutation.mutate(email);
	};

	return {
		sendVerificationCode,
		isLoading: sendVerificationMutation.isPending,
		isSuccess: sendVerificationMutation.isSuccess,
		error: sendVerificationMutation.error as AxiosError<ApiErrorResponse>
	};
}

export function useRegister() {
	const registerMutation = useMutation({
		mutationFn: (data: RegisterData) => authApi.register(data),

		onSuccess: () => {
			console.log('Регистрация прошла успешно');
		},

		onError: (error: AxiosError<ApiErrorResponse>) => {
			console.error('Ошибка при регистрации:', error);
		}
	});

	const register = (data: RegisterData) => {
		return registerMutation.mutateAsync(data);
	};

	return {
		register,
		isLoading: registerMutation.isPending,
		isSuccess: registerMutation.isSuccess,
		error: registerMutation.error as AxiosError<ApiErrorResponse>
	};
}
