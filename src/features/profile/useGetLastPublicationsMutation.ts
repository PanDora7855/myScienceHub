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
