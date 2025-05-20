import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from './api';
import { AxiosError } from 'axios';
import { ApiErrorResponse } from './useUpdateUserPassword';

export function useConfirmUpdatePassword() {
	const queryClient = useQueryClient();

	const updateMutation = useMutation({
		mutationFn: ({ code, password }: { code: string; password: string }) =>
			profileApi.confirmUserPassword(code, password),

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

	const updatePassword = (code: string, password: string) => {
		console.log({ code, password });
		updateMutation.mutate({ code, password });
	};

	return {
		updatePassword,
		isLoading: updateMutation.isPending,
		isSuccess: updateMutation.isSuccess,
		error: updateMutation.error as AxiosError<ApiErrorResponse>
	};
}
