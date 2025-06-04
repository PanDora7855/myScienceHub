import { useEffect, useState } from 'react';

export const useHashParams = () => {
	const [params, setParams] = useState<{ [key: string]: string }>({});

	useEffect(() => {
		const hash = window.location.hash.substring(1); // удаляем #
		const pairs = hash.split('&');
		const paramMap: { [key: string]: string } = {};

		pairs.forEach((pair) => {
			const [key, value] = pair.split('=');
			if (key && value) {
				paramMap[key] = decodeURIComponent(value);
			}
		});

		setParams(paramMap);
	}, []);

	return params;
};
