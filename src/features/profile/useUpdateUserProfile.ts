import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from './api';
import { IOmitData } from '../../pages/Settings/SettingsAbout/SettingsAbout.props';

export function useUpdateUserProfile() {
	const queryClient = useQueryClient();

	const updateUserMutation = useMutation({
		mutationFn: profileApi.updateUserProfile,

		onMutate: async (newUser) => {
			await queryClient.cancelQueries({
				queryKey: [profileApi.baseKey]
			});

			const prevUser = queryClient.getQueryData(profileApi.getUserProfileQueryOptions().queryKey);

			// console.log(prevUser);
			// console.log(prevUser ? { ...prevUser, ...newUser } : prevUser);

			queryClient.setQueryData(profileApi.getUserProfileQueryOptions().queryKey, (old) =>
				old ? { ...old, ...newUser } : old
			);

			return { prevUser };
		},
		onError: (_, __, context) => {
			if (context) {
				queryClient.setQueryData(profileApi.getUserProfileQueryOptions().queryKey, context.prevUser);
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

	return { updateUser };
}
