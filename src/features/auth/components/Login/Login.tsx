import { NavLink, useNavigate } from 'react-router';
import Input from '../../../../components/Input/Input';
import styles from './Login.module.scss';
import { FormEvent, useState } from 'react';
import { useAuth } from '../../useAuth';
import Button from '../../../../components/Button/Button';

const Login = () => {
	const navigate = useNavigate();
	const [login, setLogin] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const { login: loginAction, loginError } = useAuth();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const success = await loginAction(login, password);
		if (success) {
			navigate('/');
		}
	};

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
				<div className={styles['links']}>
					<NavLink to='/auth/forgot-password'>Забыли пароль</NavLink>
					<NavLink to='/auth/register'>Зарегистрироваться</NavLink>
				</div>
				<p>W2Z2gb9sVIa3</p>
			</div>
		</div>
	);
};

export default Login;
