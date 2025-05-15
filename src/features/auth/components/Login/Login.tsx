import { useNavigate } from 'react-router';
import Input from '../../../../components/Input/Input';
import styles from './Login.module.scss';
import { FormEvent, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { jsonApiInstance } from '../../../../shared/api/api-instance';
import { AxiosError } from 'axios';

const Login = () => {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [login, setLogin] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const { mutate, isPending } = useMutation({
		mutationFn: async () => {
			await jsonApiInstance.post('/login', `login=${login}&password=${password}`);

			// return response.data;
		},

		onSuccess: () => {
			setError(null);
			navigate('/');
		},

		onError: (error: AxiosError<{ message?: string }>) => {
			setError(error.response?.data.message || 'Произошла ошибка при входе');
		}
	});

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		mutate();
	};

	return (
		<div className={styles['login-page']}>
			<img src='/auth/loginCard.svg' alt='' width={574} height={534} />
			<div className={styles['right-side']}>
				<div className={styles['right-side__top']}>
					<h1>Вход</h1>
					<p>How to i get started lorem ipsum dolor at?</p>
					{error && <div className={styles['error']}>{error}</div>}
				</div>
				<form className={styles['sign-in__form']} onSubmit={handleSubmit}>
					<div className={styles['form-input']}>
						<img src='/auth/email.svg' alt='email' />
						<Input
							id='email'
							value={login}
							onChange={(e) => setLogin(e.target.value)}
							name='email'
							placeholder='Почта'
							required
						/>
					</div>
					<div className={styles['form-input']}>
						<img src='/auth/lock.svg' alt='lock' />
						<Input
							id='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							name='password'
							type='password'
							placeholder='Пароль'
							required
						/>
					</div>
					<button disabled={isPending} className={styles['form-button']} type='submit'>
						Войти
					</button>
				</form>
				<p className={styles['hr-line']}>Войти другим способом</p>
				<div className={styles['another-way']}>
					<a href='#'>
						<img src='/auth/yandex.svg' alt='' />
					</a>
					<a href='#'>
						<img src='/auth/yandex.svg' alt='' />
					</a>
					<a href='#'>
						<img src='/auth/yandex.svg' alt='' />
					</a>
					<a href='#'>
						<img src='/auth/vk.svg' alt='' />
					</a>
					<a href='#'>
						<img src='/auth/vk.svg' alt='' />
					</a>
					<a href='#'>
						<img src='/auth/vk.svg' alt='' />
					</a>
				</div>
			</div>
		</div>
	);
};
export default Login;
