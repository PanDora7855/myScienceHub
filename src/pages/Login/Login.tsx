import { useNavigate } from 'react-router';
import Input from '../../components/Input/Input';
import styles from './Login.module.scss';
import { FormEvent } from 'react';

const Login = () => {
	const navigation = useNavigate();
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		navigation('/main');
	};

	return (
		<div className={styles['login-page']}>
			<img src='/auth/loginCard.svg' alt='' width={574} height={534} />
			<div className={styles['right-side']}>
				<div className={styles['right-side__top']}>
					<h1>Вход</h1>
					<p>How to i get started lorem ipsum dolor at?</p>
				</div>
				<form className={styles['sign-in__form']} onSubmit={handleSubmit}>
					<div className={styles['form-input']}>
						<img src='/auth/email.svg' alt='email' />
						<Input id='email' name='email' placeholder='Почта' />
					</div>
					<div className={styles['form-input']}>
						<img src='/auth/lock.svg' alt='lock' />
						<Input id='password' name='password' type='password' placeholder='Пароль' />
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
