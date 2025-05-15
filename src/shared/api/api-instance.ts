import axios from 'axios';
import { baseURL } from '../../helpers/API';
import { useNavigate } from 'react-router';

export const jsonApiInstance = axios.create({
	baseURL: baseURL,
	withCredentials: true
});

jsonApiInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			const navigate = useNavigate();
			navigate('/login');
		}
		return Promise.reject(error);
	}
);
