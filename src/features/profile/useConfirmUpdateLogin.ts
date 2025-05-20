import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from './api';
import { AxiosError } from 'axios';
import { ApiErrorResponse } from './useUpdateUserPassword';

export function useConfirmUpdateLogin() {
	const queryClient = useQueryClient();

	const updateMutation = useMutation({
		mutationFn: ({ login, code }: { login: string; code: string }) => profileApi.confirmUserLogin(login, code),

		onMutate: async (newLogin) => {
			await queryClient.cancelQueries({
				queryKey: [profileApi.baseKey]
			});

			console.log('Login change initiated');

			const prevLogin = queryClient.getQueryData(profileApi.getUserQueryOptions().queryKey);

			queryClient.setQueryData(profileApi.getUserQueryOptions().queryKey, (old) =>
				old ? { ...old, login: newLogin.login } : old
			);

			return { prevLogin };
		},

		onError: (_, __, context) => {
			console.log('Login change error');
			if (context) {
				queryClient.setQueryData(profileApi.getUserQueryOptions().queryKey, context.prevLogin);
			}
		},

		onSuccess: () => {
			console.log('Login change completed');
			queryClient.invalidateQueries({
				queryKey: [profileApi.baseKey]
			});
		}
	});

	const updateUser = (login: string, code: string) => {
		updateMutation.mutate({ login, code });
	};

	return {
		updateUser,
		isLoading: updateMutation.isPending,
		isSuccess: updateMutation.isSuccess,
		error: updateMutation.error as AxiosError<ApiErrorResponse>
	};
}
