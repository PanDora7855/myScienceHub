import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from './api';
import { AxiosError } from 'axios';
import { ApiErrorResponse } from './useUpdateUserPassword';

export function useConfirmUpdatePassword() {
	const queryClient = useQueryClient();

	const updateMutation = useMutation({
		mutationFn: ({
			code,
			password,
			login,
			old_password
		}: {
			code: string;
			password: string;
			login: string;
			old_password: string;
		}) => profileApi.confirmUserPassword(code, password, login, old_password),

		onMutate: async () => {
			await queryClient.cancelQueries({
				queryKey: [profileApi.baseKey]
			});

			console.log('Password change initiated');

			const prevUserData = queryClient.getQueryData(profileApi.getUserQueryOptions().queryKey);

			return { prevUserData };
		},

		onError: (_, __, context) => {
			console.log('Password change error');
			if (context) {
				queryClient.setQueryData(profileApi.getUserQueryOptions().queryKey, context.prevUserData);
			}
		},

		onSuccess: () => {
			console.log('Password change completed');
			queryClient.invalidateQueries({
				queryKey: [profileApi.baseKey]
			});
		}
	});

	const updatePassword = (code: string, password: string, login: string, old_password: string) => {
		updateMutation.mutate({ code, password, login, old_password });
	};

	return {
		updatePassword,
		isLoading: updateMutation.isPending,
		isSuccess: updateMutation.isSuccess,
		isError: updateMutation.isError,
		error: updateMutation.error as AxiosError<ApiErrorResponse>
	};
}
