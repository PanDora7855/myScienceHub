import { MouseEvent, useState, useEffect } from 'react';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import styles from './SettingsSecurity.module.scss';
import { useProfile } from '../../useProfile';
import { useConfirmUpdateLogin } from '../../useConfirmUpdateLogin';
import { useUpdateUserPassword } from '../../useUpdateUserPassword';
import { useConfirmUpdatePassword } from '../../useConfirmUpdatePassword';
import { useUpdateUserLogin } from '../../useUpdateUserLogin';
import { useCancelEmailChange, useCancelPasswordChange } from '../../useCancelChanges';

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
	const {
		updatePassword,
		isLoading: isPasswordUpdateLoading,
		// isSuccess: isPasswordUpdateSuccess,
		error: passwordUpdateError,
		isError: isPasswordUpdateError
	} = useConfirmUpdatePassword();

	// Хуки для отмены изменений
	const { cancelEmailChange, isLoading: isCancellingEmail, isSuccess: isEmailCancelled } = useCancelEmailChange();
	const {
		cancelPasswordChange,
		isLoading: isCancellingPassword,
		isSuccess: isPasswordCancelled
	} = useCancelPasswordChange();

	// Локальные состояния для отслеживания отправки кодов
	const [isEmailCodeSent, setIsEmailCodeSent] = useState<boolean>(false);
	const [isPasswordCodeSent, setIsPasswordCodeSent] = useState<boolean>(false);

	const [newLogin, setNewLogin] = useState<string>('');
	const [loginVerificationCode, setLoginVerificationCode] = useState<string>('');
	const [loginError, setLoginError] = useState<string | null>(null);
	const [loginSuccess, setLoginSuccess] = useState<string | null>(null);

	const [passwords, setPasswords] = useState<Record<string, string>>({
		currentPassword: '',
		newPassword: '',
		confirmPassword: ''
	});
	const [passwordVerificationCode, setPasswordVerificationCode] = useState<string>('');
	const [passwordError, setPasswordError] = useState<string | null>(null);
	const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

	// Отслеживаем успешную отправку кодов
	useEffect(() => {
		if (isLoginVerificationSent) {
			setIsEmailCodeSent(true);
		}
	}, [isLoginVerificationSent]);

	useEffect(() => {
		if (isPasswordVerificationSent) {
			setIsPasswordCodeSent(true);
		}
	}, [isPasswordVerificationSent]);

	const handleSendLoginVerification = (e: MouseEvent) => {
		e.preventDefault();

		setLoginError(null);
		setLoginSuccess(null);

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

		updateUser(newLogin, loginVerificationCode);
		setLoginSuccess('Адрес электронной почты успешно изменен');
		// Сбрасываем все состояния после успешной смены
		setNewLogin('');
		setLoginVerificationCode('');
		setIsEmailCodeSent(false);
	};

	const handleCancelEmailChange = () => {
		if (newLogin.trim()) {
			cancelEmailChange(newLogin);
		}
		// Сбрасываем все состояния
		setNewLogin('');
		setLoginVerificationCode('');
		setLoginError(null);
		setLoginSuccess('Смена почты отменена');
		setIsEmailCodeSent(false); // Скрываем кнопку отмены
	};

	const handleSendPasswordVerification = (e: MouseEvent) => {
		e.preventDefault();

		setPasswordError(null);
		setPasswordSuccess(null);

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

		setPasswordSuccess('Пароль успешно изменен');
		// Сбрасываем все состояния после успешной смены
		updatePassword(passwordVerificationCode, passwords.newPassword, data?.login || '', passwords.currentPassword);
		setPasswords({
			currentPassword: '',
			newPassword: '',
			confirmPassword: ''
		});
		setPasswordVerificationCode('');
		setIsPasswordCodeSent(false);
	};

	const handleCancelPasswordChange = () => {
		cancelPasswordChange();
		// Сбрасываем все состояния
		setPasswords({
			currentPassword: '',
			newPassword: '',
			confirmPassword: ''
		});
		setPasswordVerificationCode('');
		setPasswordError(null);
		setPasswordSuccess('Смена пароля отменена');
		setIsPasswordCodeSent(false); // Скрываем кнопку отмены
	};

	// Обработка успешной отмены действий
	useEffect(() => {
		if (isEmailCancelled && !loginSuccess?.includes('отменена')) {
			setLoginSuccess('Смена почты отменена');
		}
	}, [isEmailCancelled, loginSuccess]);

	useEffect(() => {
		if (isPasswordCancelled && !passwordSuccess?.includes('отменена')) {
			setPasswordSuccess('Смена пароля отменена');
		}
	}, [isPasswordCancelled, passwordSuccess]);

	if (isLoading) return <div>Загрузка...</div>;
	if (error) return <div>Произошла ошибка</div>;

	return (
		<div className={styles['security']}>
			<h3 className={styles['section-title']}>Изменение адреса электронной почты</h3>

			{/* Сообщения для смены почты */}
			{(loginError || loginVerificationError || loginUpdateError) && (
				<div className={styles['error-message']}>
					{loginError ??
						loginVerificationError?.response?.data.error ??
						loginUpdateError?.response?.data.error}
				</div>
			)}

			{loginSuccess && !isEmailCancelled && <div className={styles['success-message']}>{loginSuccess}</div>}

			<div className={styles['edit-field']}>
				<p>Новая почта</p>
				<Input
					className='darker'
					value={newLogin}
					placeholder={data?.login ?? ''}
					onChange={(e) => setNewLogin(e.target.value)}
				/>
			</div>

			{!isEmailCodeSent ? (
				<div className={styles['button-group']}>
					<Button
						className='purple'
						onClick={handleSendLoginVerification}
						disabled={isLoginVerificationLoading || isCancellingEmail}
					>
						{isLoginVerificationLoading ? 'Отправка...' : 'Получить код'}
					</Button>
				</div>
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
					<div className={styles['button-group']}>
						<Button
							className='purple'
							onClick={handleConfirmEmailChange}
							disabled={isLoginUpdateLoading || isCancellingEmail}
						>
							{isLoginUpdateLoading ? 'Обновление...' : 'Изменить почту'}
						</Button>
						<Button className='red' onClick={handleCancelEmailChange} disabled={isCancellingEmail}>
							{isCancellingEmail ? 'Отмена...' : 'Отменить смену'}
						</Button>
					</div>
				</>
			)}

			<h3 className={styles['section-title']}>Изменение пароля</h3>

			{/* Сообщения для смены пароля */}
			{(passwordError || passwordVerificationError || isPasswordUpdateError) && (
				<div className={styles['error-message']}>
					{passwordError ??
						passwordVerificationError?.response?.data.error ??
						passwordUpdateError?.response?.data.error}
				</div>
			)}

			{passwordSuccess && !isPasswordCancelled && !isPasswordUpdateError && !isPasswordUpdateLoading && (
				<div className={styles['success-message']}>{passwordSuccess}</div>
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

			{!isPasswordCodeSent ? (
				<div className={styles['button-group']}>
					<Button
						className='purple'
						onClick={handleSendPasswordVerification}
						disabled={isPasswordVerificationLoading || isCancellingPassword}
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
					<div className={styles['button-group']}>
						<Button
							className='purple'
							onClick={handleConfirmPasswordChange}
							disabled={isPasswordUpdateLoading || isCancellingPassword}
						>
							{isPasswordUpdateLoading ? 'Обновление...' : 'Изменить пароль'}
						</Button>
						<Button className='red' onClick={handleCancelPasswordChange} disabled={isCancellingPassword}>
							{isCancellingPassword ? 'Отмена...' : 'Отменить смену'}
						</Button>
					</div>
				</>
			)}
		</div>
	);
};

export default SettingsSecurity;
