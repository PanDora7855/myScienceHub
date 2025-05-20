import { MouseEvent, useState } from 'react';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import styles from './SettingsSecurity.module.scss';
import { useProfile } from '../../useProfile';
import { useConfirmUpdateLogin } from '../../useConfirmUpdateLogin';
import { useUpdateUserPassword } from '../../useUpdateUserPassword';
import { useConfirmUpdatePassword } from '../../useConfirmUpdatePassword';
import { useUpdateUserLogin } from '../../useUpdateUserLogin';

const SettingsSecurity = () => {
	const { data, error, isLoading } = useProfile();
	const { updateUser, isLoading: isLoginUpdateLoading, error: loginUpdateError } = useConfirmUpdateLogin();
	const {
		sendVerificationPasswordCode,
		isLoading: isPasswordVerificationLoading,
		isSuccess: isPasswordVerificationSent,
		error: passwordVerificationError
	} = useUpdateUserPassword();

	const {
		sendVerificationLoginCode,
		isLoading: isLoginVerificationLoading,
		isSuccess: isLoginVerificationSent,
		error: loginVerificationError
	} = useUpdateUserLogin();
	const { updatePassword, isLoading: isPasswordUpdateLoading } = useConfirmUpdatePassword();

	const [newLogin, setNewLogin] = useState<string>('');
	const [loginVerificationCode, setLoginVerificationCode] = useState<string>('');
	const [loginError, setLoginError] = useState<string | null>(null);

	const [passwords, setPasswords] = useState<Record<string, string>>({
		currentPassword: '',
		newPassword: '',
		confirmPassword: ''
	});
	const [passwordVerificationCode, setPasswordVerificationCode] = useState<string>('');
	const [passwordError, setPasswordError] = useState<string | null>(null);

	const handleSendLoginVerification = (e: MouseEvent) => {
		e.preventDefault();

		setLoginError(null);

		if (!newLogin.trim()) {
			setLoginError('Введите новый адрес электронной почты');
			return;
		}

		if (data?.login) {
			sendVerificationLoginCode(newLogin);
		}
	};

	const handleConfirmEmailChange = (e: MouseEvent) => {
		e.preventDefault();

		if (!loginVerificationCode.trim()) {
			setLoginError('Введите код подтверждения');
			return;
		}

		if (loginUpdateError) {
			setLoginError('Произошла ошибка при обновлении данных');
			console.log(loginUpdateError);
			return;
		}

		updateUser(newLogin, loginVerificationCode);

		setNewLogin('');
		setLoginVerificationCode('');
	};

	const handleSendPasswordVerification = (e: MouseEvent) => {
		e.preventDefault();

		setPasswordError(null);

		if (!passwords.currentPassword) {
			setPasswordError('Введите текущий пароль');
			return;
		}

		if (!passwords.newPassword) {
			setPasswordError('Введите новый пароль');
			return;
		}

		if (passwords.newPassword !== passwords.confirmPassword) {
			setPasswordError('Новые пароли не совпадают');
			return;
		}

		if (data?.login) {
			sendVerificationPasswordCode(data.login);
		}
	};

	const handleConfirmPasswordChange = (e: MouseEvent) => {
		e.preventDefault();

		if (!passwordVerificationCode) {
			setPasswordError('Введите код подтверждения');
			return;
		}

		updatePassword(passwordVerificationCode, passwords.newPassword);

		setPasswords({
			currentPassword: '',
			newPassword: '',
			confirmPassword: ''
		});
		setPasswordVerificationCode('');
	};

	if (isLoading) return <div>Загрузка...</div>;
	if (error) return <div>Произошла ошибка</div>;

	return (
		<div className={styles['security']}>
			<h3 className={styles['section-title']}>Изменение адреса электронной почты</h3>

			{(loginError || loginVerificationError || loginUpdateError) && (
				<div className={styles['error-message']}>
					{loginError ??
						loginVerificationError?.response?.data.error ??
						loginUpdateError?.response?.data.error}
				</div>
			)}

			<div className={styles['edit-field']}>
				<p>Новая почта</p>
				<Input
					className='darker'
					value={newLogin}
					placeholder={data?.login ?? ''}
					onChange={(e) => setNewLogin(e.target.value)}
				/>
			</div>
			{!isLoginVerificationSent ? (
				<Button className='purple' onClick={handleSendLoginVerification} disabled={isLoginVerificationLoading}>
					{isLoginVerificationLoading ? 'Отправка...' : 'Получить код'}
				</Button>
			) : (
				<>
					<div className={styles['edit-field']}>
						<p>Код подтверждения</p>
						<Input
							className='darker'
							value={loginVerificationCode}
							placeholder='Введите код подтверждения'
							onChange={(e) => setLoginVerificationCode(e.target.value)}
						/>
					</div>
					<Button className='purple' onClick={handleConfirmEmailChange} disabled={isLoginUpdateLoading}>
						{isLoginUpdateLoading ? 'Обновление...' : 'Изменить почту'}
					</Button>
				</>
			)}

			<h3 className={styles['section-title']}>Изменение пароля</h3>

			{(passwordError || passwordVerificationError) && (
				<div className={styles['error-message']}>
					{passwordError ?? passwordVerificationError?.response?.data.error}
				</div>
			)}

			<div className={styles['edit-field']}>
				<p>Текущий пароль</p>
				<Input
					className='darker'
					type='password'
					value={passwords.currentPassword ?? ''}
					placeholder='Введите текущий пароль'
					onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
				/>
			</div>

			<div className={styles['edit-field']}>
				<p>Новый пароль</p>
				<Input
					className='darker'
					type='password'
					value={passwords.newPassword ?? ''}
					placeholder='Введите новый пароль'
					onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
				/>
			</div>

			<div className={styles['edit-field']}>
				<p>Подтвердите пароль</p>
				<Input
					className='darker'
					type='password'
					value={passwords.confirmPassword ?? ''}
					placeholder='Подтвердите новый пароль'
					onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
				/>
			</div>

			{!isPasswordVerificationSent ? (
				<div className={styles['button-container']}>
					<Button
						className='purple'
						onClick={handleSendPasswordVerification}
						disabled={isPasswordVerificationLoading}
					>
						{isPasswordVerificationLoading ? 'Отправка...' : 'Получить код'}
					</Button>
				</div>
			) : (
				<>
					<div className={styles['edit-field']}>
						<p>Код подтверждения</p>
						<Input
							className='darker'
							value={passwordVerificationCode}
							placeholder='Введите код подтверждения'
							onChange={(e) => setPasswordVerificationCode(e.target.value)}
						/>
					</div>
					<div className={styles['button-container']}>
						<Button
							className='purple'
							onClick={handleConfirmPasswordChange}
							disabled={isPasswordUpdateLoading}
						>
							{isPasswordUpdateLoading ? 'Обновление...' : 'Изменить пароль'}
						</Button>
					</div>
				</>
			)}
		</div>
	);
};
export default SettingsSecurity;
