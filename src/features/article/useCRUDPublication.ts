import { useMutation, useQueryClient } from '@tanstack/react-query';
import { articleApi } from './api';
import { profileApi } from '../profile/api';

export const useCreatePublication = () => {
	const queryClient = useQueryClient();

	const createMutation = useMutation({
		mutationFn: articleApi.createPublication,

		onSuccess: () => {
			// Просто обновляем все связанные данные
			queryClient.invalidateQueries({
				queryKey: [articleApi.baseKey]
			});
			queryClient.invalidateQueries({
				queryKey: [profileApi.baseKey]
			});
		},

		onError: (error) => {
			console.error('Ошибка при создании публикации:', error);
		}
	});

	const createPublication = (formData: FormData) => {
		createMutation.mutate(formData);
	};

	return {
		createPublication,
		isLoading: createMutation.isPending,
		isSuccess: createMutation.isSuccess,
		error: createMutation.error
	};
};

export const useUpdatePublication = () => {
	const queryClient = useQueryClient();

	const updateMutation = useMutation({
		mutationFn: articleApi.updatePublication,

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [articleApi.baseKey]
			});
			queryClient.invalidateQueries({
				queryKey: [profileApi.baseKey]
			});
		},

		onError: (error) => {
			console.error('Ошибка при обновлении публикации:', error);
		}
	});

	const updatePublication = (formData: FormData) => {
		updateMutation.mutate(formData);
	};

	return {
		updatePublication,
		isLoading: updateMutation.isPending,
		isSuccess: updateMutation.isSuccess,
		error: updateMutation.error
	};
};

export const useDeletePublication = () => {
	const queryClient = useQueryClient();

	const deleteMutation = useMutation({
		mutationFn: ({ id, fileLink, owner_id }: { id: number; fileLink: string; owner_id: number }) =>
			articleApi.deletePublication(id, fileLink, owner_id),

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [articleApi.baseKey]
			});
			queryClient.invalidateQueries({
				queryKey: [profileApi.baseKey]
			});
		},

		onError: (error) => {
			console.error('Ошибка при удалении публикации:', error);
		}
	});

	const deletePublication = (id: number, fileLink: string, owner_id: number) => {
		deleteMutation.mutate({ id, fileLink, owner_id });
	};

	return {
		deletePublication,
		isLoading: deleteMutation.isPending,
		isSuccess: deleteMutation.isSuccess,
		error: deleteMutation.error
	};
};
