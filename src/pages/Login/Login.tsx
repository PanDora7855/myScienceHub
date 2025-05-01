import { useNavigate } from 'react-router';
import Input from '../../components/Input/Input';
import styles from './Login.module.scss';
import { FormEvent, useEffect, useState } from 'react';
// import { apiInstance } from '../../services/api-instance';
// import { ILoginProps as ILoginForm } from './Login.props';

const Login = () => {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const jwt = localStorage.getItem('jwt');

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setError('asdasd');

		localStorage.setItem('jwt', '123');
		// const target = e.target as typeof e.target & ILoginForm;
		// const { email, password } = target;
		//TODO сюда надо будет впихнуть запрос на пользователя
	};

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

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
						<Input id='email' name='email' placeholder='Почта' required />
					</div>
					<div className={styles['form-input']}>
						<img src='/auth/lock.svg' alt='lock' />
						<Input id='password' name='password' type='password' placeholder='Пароль' required />
					</div>
					<button className={styles['form-button']} type='submit'>
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
