import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useHashParams } from '../../../../hooks/useHashParams';
import { jsonApiInstance } from '../../../../shared/api/api-instance';

const CallbackYa = () => {
	const hashParams = useHashParams();
	const navigate = useNavigate();
	const access_token = hashParams.access_token;
	const cid = hashParams.cid;
	const expires_in = hashParams.expires_in;
	const token_type = hashParams.token_type;

	// console.log(hashParams);

	useEffect(() => {
		if (access_token) {
			// console.log('[OAuth] Received code:', token);

			const fetchToken = async () => {
				try {
					// After token exchange

					const response = await jsonApiInstance.post('/token-ya', {
						access_token,
						cid,
						expires_in,
						token_type
					});

					// console.log(response);

					if (response.data.status === 200) {
						navigate('/');
					}
				} catch (err) {
					console.error('[OAuth] Token exchange failed:', err.response?.data || err.message);
				}
			};

			fetchToken();
		} else {
			console.warn('[OAuth] No code found in URL.');
		}
	}, [hashParams, navigate, access_token, cid, expires_in, token_type]);

	return <div>Обработка входа...</div>;
};
export default CallbackYa;
