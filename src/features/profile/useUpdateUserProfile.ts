import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from './api';
import { IOmitData } from './components/SettingsAbout/SettingsAbout.props';
import { AxiosError } from 'axios';
import { ApiErrorResponse } from './useUpdateUserPassword';

export function useUpdateUserProfile() {
	const queryClient = useQueryClient();

	const updateUserMutation = useMutation({
		mutationFn: profileApi.updateUserProfile,

		onMutate: async (newUser) => {
			await queryClient.cancelQueries({
				queryKey: [profileApi.baseKey]
			});

			const prevUser = queryClient.getQueryData(profileApi.getUserQueryOptions().queryKey);

			// console.log(prevUser);
			// console.log(prevUser ? { ...prevUser, ...newUser } : prevUser);

			queryClient.setQueryData(profileApi.getUserQueryOptions().queryKey, (old) =>
				old ? { ...old, ...newUser } : old
			);

			return { prevUser };
		},
		onError: (_, __, context) => {
			if (context) {
				queryClient.setQueryData(profileApi.getUserQueryOptions().queryKey, context.prevUser);
			}
		},

		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: [profileApi.baseKey]
			});
		}
	});

	const updateUser = (data: IOmitData) => {
		updateUserMutation.mutate(data);
	};

	return {
		updateUser,
		isSuccess: updateUserMutation.isSuccess,
		error: updateUserMutation.error as AxiosError<ApiErrorResponse>
	};
}
