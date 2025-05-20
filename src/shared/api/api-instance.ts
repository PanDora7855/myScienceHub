import axios from 'axios';
import { baseURL } from '../../helpers/API';

export const jsonApiInstance = axios.create({
	baseURL: baseURL,
	withCredentials: true
});

jsonApiInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			console.log('401');
		}
		return Promise.reject(error);
	}
);
