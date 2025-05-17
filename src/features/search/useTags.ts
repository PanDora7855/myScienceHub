import { useQuery } from '@tanstack/react-query';
import { searchApi } from './api';

export function useTags() {
	const { data, error, isLoading } = useQuery({
		...searchApi.getTags()
	});

	return { data, error, isLoading };
}
