import Input from '../../components/Input/Input';
import styles from './Login.module.scss';

const Login = () => {
	return (
		<div className={styles['login-page']}>
			<img src='/loginCard.svg' alt='' width={574} height={534} />
			<div className={styles['right-side']}>
				<div className={styles['right-side__top']}>
					<h1>Вход</h1>
					<p>How to i get started lorem ipsum dolor at?</p>
				</div>
				<form className={styles['sign-in__form']} action='/'>
					<div className={styles['form-input']}>
						<img src='/email.svg' alt='email' />
						<Input id='email' name='email' placeholder='Почта' />
					</div>
					<div className={styles['form-input']}>
						<img src='/lock.svg' alt='lock' />
						<Input id='password' name='password' type='password' placeholder='Пароль' />
					</div>
					<button className={styles['form-button']} type='submit'>
						Войти
					</button>
				</form>
				<p className={styles['hr-line']}>Войти другим способом</p>
				<div className={styles['another-way']}>
					<a href='#'>
						<img src='/yandex.svg' alt='' />
					</a>
					<a href='#'>
						<img src='/yandex.svg' alt='' />
					</a>
					<a href='#'>
						<img src='/yandex.svg' alt='' />
					</a>
					<a href='#'>
						<img src='/vk.svg' alt='' />
					</a>
					<a href='#'>
						<img src='/vk.svg' alt='' />
					</a>
					<a href='#'>
						<img src='/vk.svg' alt='' />
					</a>
				</div>
			</div>
		</div>
	);
};
export default Login;
