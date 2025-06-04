import { useState } from 'react';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import styles from './ForgotPassword.module.scss';
import { profileApi } from '../../../profile/api';
import { useNavigate } from 'react-router';

const ForgotPassword = () => {
	const navigate = useNavigate();

	const [inputValue, setInputValue] = useState<string>('');
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	// Состояния для паролей и кода
	const [passwords, setPasswords] = useState({
		newPassword: '',
		confirmPassword: ''
	});
	const [verificationCode, setVerificationCode] = useState<string>('');

	// Состояния для ошибок
	const [emailError, setEmailError] = useState<string | null>(null);
	const [passwordError, setPasswordError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const handleSendCode = async () => {
		setEmailError(null);

		if (!inputValue.trim()) {
			setEmailError('Введите адрес электронной почты');
			return;
		}

		if (!/\S+@\S+\.\S+/.test(inputValue)) {
			setEmailError('Введите корректный адрес электронной почты');
			return;
		}

		setIsLoading(true);

		try {
			await profileApi.sendVerificationCodeForPassword(inputValue);
			setIsOpen(true);
			setSuccessMessage('Код подтверждения отправлен на вашу почту');
		} catch {
			setEmailError('Ошибка при отправке кода. Проверьте адрес электронной почты.');
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmitNewPassword = async () => {
		setPasswordError(null);

		// Валидация паролей
		if (!passwords.newPassword) {
			setPasswordError('Введите новый пароль');
			return;
		}

		if (passwords.newPassword.length < 6) {
			setPasswordError('Пароль должен содержать минимум 6 символов');
			return;
		}

		if (!passwords.confirmPassword) {
			setPasswordError('Подтвердите новый пароль');
			return;
		}

		if (passwords.newPassword !== passwords.confirmPassword) {
			setPasswordError('Пароли не совпадают');
			return;
		}

		if (!verificationCode.trim()) {
			setPasswordError('Введите код подтверждения');
			return;
		}

		setIsSubmitting(true);

		try {
			await profileApi.forgetPassword(verificationCode, inputValue, passwords.newPassword);
			setSuccessMessage('Пароль успешно изменен!');

			// Сброс формы
			setInputValue('');
			setPasswords({ newPassword: '', confirmPassword: '' });
			setVerificationCode('');
			setIsOpen(false);

			// Можно добавить редирект на страницу входа
			setTimeout(() => {
				navigate('/auth/login');
			}, 2000);
		} catch {
			setPasswordError('Ошибка при смене пароля. Проверьте код подтверждения.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className={styles['forgot-password']}>
			<div className={styles['container']}>
				<h2>Восстановление пароля</h2>

				{/* Сообщения об ошибках и успехе */}
				{emailError && <div className={styles['error-message']}>{emailError}</div>}
				{passwordError && <div className={styles['error-message']}>{passwordError}</div>}
				{successMessage && <div className={styles['success-message']}>{successMessage}</div>}

				{/* Поле ввода email */}
				<Input
					className='darker'
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder='Введите вашу почту'
					disabled={isOpen}
				/>

				{!isOpen ? (
					<Button className='purple' onClick={handleSendCode} disabled={isLoading}>
						{isLoading ? 'Отправка...' : 'Отправить код'}
					</Button>
				) : (
					<>
						<Input
							className='darker'
							value={verificationCode}
							onChange={(e) => setVerificationCode(e.target.value)}
							placeholder='Введите код подтверждения'
						/>
						<Input
							className='darker'
							type='password'
							value={passwords.newPassword}
							onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
							placeholder='Новый пароль'
						/>

						<Input
							className='darker'
							type='password'
							value={passwords.confirmPassword}
							onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
							placeholder='Подтвердите новый пароль'
						/>

						<Button className='green' onClick={handleSubmitNewPassword} disabled={isSubmitting}>
							{isSubmitting ? 'Сохранение...' : 'Изменить пароль'}
						</Button>

						<Button
							className='white'
							onClick={() => {
								setIsOpen(false);
								setPasswords({ newPassword: '', confirmPassword: '' });
								setVerificationCode('');
								setPasswordError(null);
							}}
							disabled={isSubmitting}
						>
							Отмена
						</Button>
					</>
				)}
			</div>
		</div>
	);
};

export default ForgotPassword;
