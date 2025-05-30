import { useMutation } from '@tanstack/react-query';
// import { AxiosError } from 'axios';
import { profileApi } from './api';

interface GetLastPublicationsParams {
	CountPublications: number;
	DateEnd: Date | null;
	DateStart: Date | null;
	Type: number;
}

export const useGetLastPublicationsMutation = () => {
	const getLastPublications = useMutation({
		mutationKey: ['profile', 'getLastPublications'],
		mutationFn: async ({ CountPublications, DateEnd, DateStart, Type }: GetLastPublicationsParams) => {
			return profileApi.getLastPublications(CountPublications, DateEnd, DateStart, Type);
		},

		onSuccess: (data) => {
			console.log(data);
			// Побочный эффект: скачивание файла
			// const blob = data;
			// const url = window.URL.createObjectURL(blob);
			// const a = document.createElement('a');
			// a.href = url;
			// a.download = 'publications_list';
			// document.body.appendChild(a); // для поддержки Safari
			// a.click();
			// a.remove();
			// window.URL.revokeObjectURL(url);
		},

		onError: (error) => {
			console.log(error);
		}
	});
	const downloadFile = (CountPublications: number, DateEnd: Date | null, DateStart: Date | null, Type: number) => {
		getLastPublications.mutate({ CountPublications, DateEnd, DateStart: DateStart, Type });
	};

	return { downloadFile, isLoading: getLastPublications.isPending };
};
