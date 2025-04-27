import axios from 'axios';

const baseURL = 'http://localhost:3000';

// Рот ебал я ваш CORS
export const axiosFetching = axios.create({
	baseURL: baseURL
	// withCredentials: true
});

axiosFetching.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			console.error('Unauthorized access - possibly invalid token');
		}
		return Promise.reject(error);
	}
);
