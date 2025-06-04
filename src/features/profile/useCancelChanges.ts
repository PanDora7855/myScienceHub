import { useMutation } from '@tanstack/react-query';
import { profileApi } from './api';
import { AxiosError } from 'axios';

interface ApiErrorResponse {
	error: string;
	message?: string;
	status?: number;
}

export function useCancelEmailChange() {
	const cancelEmailMutation = useMutation({
		mutationFn: (newEmail: string) => profileApi.cancelEmailChange(newEmail),

		onSuccess: () => {
			console.log('Смена почты успешно отменена');
		},

		onError: (error: AxiosError<ApiErrorResponse>) => {
			console.error('Ошибка при отмене смены почты:', error);
		}
	});

	const cancelEmailChange = (newEmail: string) => {
		cancelEmailMutation.mutate(newEmail);
	};

	return {
		cancelEmailChange,
		isLoading: cancelEmailMutation.isPending,
		isSuccess: cancelEmailMutation.isSuccess,
		error: cancelEmailMutation.error as AxiosError<ApiErrorResponse>
	};
}

export function useCancelPasswordChange() {
	const cancelPasswordMutation = useMutation({
		mutationFn: () => profileApi.cancelPasswordChange(),

		onSuccess: () => {
			console.log('Смена пароля успешно отменена');
		},

		onError: (error: AxiosError<ApiErrorResponse>) => {
			console.error('Ошибка при отмене смены пароля:', error);
		}
	});

	const cancelPasswordChange = () => {
		cancelPasswordMutation.mutate();
	};

	return {
		cancelPasswordChange,
		isLoading: cancelPasswordMutation.isPending,
		isSuccess: cancelPasswordMutation.isSuccess,
		error: cancelPasswordMutation.error as AxiosError<ApiErrorResponse>
	};
}
