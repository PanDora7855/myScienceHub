import { NavLink, useNavigate } from 'react-router';
import Input from '../../../../components/Input/Input';
import styles from './Login.module.scss';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../../useAuth';
import Button from '../../../../components/Button/Button';

const Login = () => {
	const navigate = useNavigate();
	const [login, setLogin] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const { login: loginAction, loginError } = useAuth();
	const CLIENT_ID_YA = 'a4f37a21f4594c9d972a8a00169d49d8';
	const REDIRECT_URI_YA = 'http://localhost:5173/callback-ya';

	useEffect(() => {}, []);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const success = await loginAction(login, password);
		if (success) {
			navigate('/');
		}
	};

	const handleYandex = async () => {
		const authUrl = `https://oauth.yandex.com/authorize?response_type=token&client_id=${CLIENT_ID_YA}&redirect_uri=${encodeURIComponent(
			REDIRECT_URI_YA
		)}`;
		window.location.href = authUrl;
	};

	// const handleVk = () => {
	// 	window.location.href =
	// 		'https://id.vk.com/authorize?response_type=code&client_id=53667296&scope=email%20phone&redirect_uri=http://localhost&state=XXXRandomZZZ&code_challenge=K8KAyQ82WSEncryptedVerifierGYUDj8K&code_challenge_method=S256';
	// };

	return (
		<div className={styles['login-page']}>
			<img src='/auth/loginCard.svg' alt='' width={574} height={534} />
			<div className={styles['right-side']}>
				<div className={styles['right-side__top']}>
					<h1>Вход</h1>
					{loginError && <div className={styles['error']}>{loginError}</div>}
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
					<Button className='purple' type='submit'>
						Войти
					</Button>
				</form>
				<p className={styles['hr-line']}>Войти другим способом</p>
				<div className={styles['another-way']}>
					<button className={styles['yandex-btn']} onClick={() => handleYandex()}>
						<img src='/auth/yandex.svg' alt='yandex' />
						Войти через Яндекс
					</button>
					{/* <div onClick={() => handleVk()} id='VkIdSdkOneTap'>
						asdasdasd
					</div> */}
				</div>
				<div className={styles['links']}>
					<NavLink to='/auth/forgot-password'>Забыли пароль</NavLink>
					<NavLink to='/auth/register'>Зарегистрироваться</NavLink>
				</div>
			</div>
		</div>
	);
};

export default Login;
