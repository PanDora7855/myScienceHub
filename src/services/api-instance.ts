import axios from 'axios';
import { baseURL } from '../helpers/API';

// Рот ебал я ваш CORS
export const apiInstance = axios.create({
	baseURL: baseURL
	// withCredentials: true
});

apiInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			console.error('Unauthorized access - possibly invalid token');
		}
		return Promise.reject(error);
	}
);
