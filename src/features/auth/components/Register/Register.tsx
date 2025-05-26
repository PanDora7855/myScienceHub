import { NavLink, useNavigate } from 'react-router';
import Input from '../../../../components/Input/Input';
import styles from './Register.module.scss';
import { FormEvent, useState } from 'react';
import { useSendVerificationCode, useRegister } from '../../useRegister';
import { RegisterFormData } from '../../api';

const Register = () => {
	const navigate = useNavigate();
	const {
		sendVerificationCode,
		isLoading: isSendingCode,
		isSuccess: isCodeSent,
		error: codeError
	} = useSendVerificationCode();
	const { register, isLoading: isRegistering, error: registerError } = useRegister();

	const [formData, setFormData] = useState<RegisterFormData>({
		email: '',
		firstName: '',
		lastName: '',
		password: '',
		confirmPassword: '',
		verificationCode: ''
	});

	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const validateForm = (): boolean => {
		const newErrors: { [key: string]: string } = {};

		if (!formData.email) {
			newErrors.email = 'Email обязателен';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Некорректный email';
		}

		if (!formData.firstName.trim()) {
			newErrors.firstName = 'Имя обязательно';
		}

		if (!formData.lastName.trim()) {
			newErrors.lastName = 'Фамилия обязательна';
		}

		if (!formData.password) {
			newErrors.password = 'Пароль обязателен';
		} else if (formData.password.length < 6) {
			newErrors.password = 'Пароль должен содержать минимум 6 символов';
		}

		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = 'Пароли не совпадают';
		}

		if (isCodeSent && !formData.verificationCode.trim()) {
			newErrors.verificationCode = 'Код подтверждения обязателен';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSendCode = async (e: React.MouseEvent) => {
		e.preventDefault();

		if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
			setErrors({ email: 'Введите корректный email' });
			return;
		}

		setErrors({});
		sendVerificationCode(formData.email);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		if (!isCodeSent) {
			setErrors({ verificationCode: 'Сначала получите код подтверждения' });
			return;
		}

		try {
			await register({
				code: formData.verificationCode,
				profile: {
					login: formData.email,
					first_name: formData.firstName,
					last_name: formData.lastName,
					password: formData.password
				}
			});

			navigate('/');
		} catch (error) {
			console.error('Ошибка регистрации:', error);
		}
	};

	const handleInputChange = (field: keyof RegisterFormData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));

		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: '' }));
		}
	};

	return (
		<div className={styles['register-page']}>
			<img src='/auth/loginCard.svg' alt='' width={574} height={534} />
			<div className={styles['right-side']}>
				<div className={styles['right-side__top']}>
					<h1>Регистрация</h1>
					<p>Создайте аккаунт для доступа к платформе</p>

					{codeError && (
						<div className={styles['error']}>
							{codeError.response?.data?.error || 'Ошибка при отправке кода'}
						</div>
					)}
					{registerError && (
						<div className={styles['error']}>
							{registerError.response?.data?.error || 'Ошибка при регистрации'}
						</div>
					)}

					{isCodeSent && <div className={styles['success']}>Код подтверждения отправлен на вашу почту</div>}
				</div>

				<form className={styles['register-form']} onSubmit={handleSubmit}>
					<div className={styles['form-input']}>
						<img src='/auth/email.svg' alt='email' />
						<Input
							id='email'
							value={formData.email}
							onChange={(e) => handleInputChange('email', e.target.value)}
							name='email'
							type='email'
							placeholder='Email'
							isValid={!errors.email}
							required
						/>
					</div>
					{errors.email && <div className={styles['field-error']}>{errors.email}</div>}

					<button
						type='button'
						className={styles['verification-button']}
						onClick={handleSendCode}
						disabled={isSendingCode || isCodeSent}
					>
						{isSendingCode ? 'Отправка...' : isCodeSent ? 'Код отправлен' : 'Получить код'}
					</button>

					{isCodeSent && (
						<>
							<div className={styles['form-input']}>
								<img src='/auth/lock.svg' alt='code' />
								<Input
									id='verificationCode'
									value={formData.verificationCode}
									onChange={(e) => handleInputChange('verificationCode', e.target.value)}
									name='verificationCode'
									placeholder='Код подтверждения'
									isValid={!errors.verificationCode}
									required
								/>
							</div>
							{errors.verificationCode && (
								<div className={styles['field-error']}>{errors.verificationCode}</div>
							)}
						</>
					)}

					<div className={styles['form-input']}>
						{/* <img src='/auth/user.svg' alt='user' /> */}
						<Input
							id='lastName'
							value={formData.lastName}
							onChange={(e) => handleInputChange('lastName', e.target.value)}
							name='lastName'
							placeholder='Фамилия'
							isValid={!errors.lastName}
							required
						/>
					</div>
					{errors.lastName && <div className={styles['field-error']}>{errors.lastName}</div>}

					<div className={styles['form-input']}>
						{/* <img src='/auth/user.svg' alt='user' /> */}
						<Input
							id='firstName'
							value={formData.firstName}
							onChange={(e) => handleInputChange('firstName', e.target.value)}
							name='firstName'
							placeholder='Имя'
							isValid={!errors.firstName}
							required
						/>
					</div>
					{errors.firstName && <div className={styles['field-error']}>{errors.firstName}</div>}

					<div className={styles['form-input']}>
						<img src='/auth/lock.svg' alt='lock' />
						<Input
							id='password'
							value={formData.password}
							onChange={(e) => handleInputChange('password', e.target.value)}
							name='password'
							type='password'
							placeholder='Пароль'
							isValid={!errors.password}
							required
						/>
					</div>
					{errors.password && <div className={styles['field-error']}>{errors.password}</div>}

					<div className={styles['form-input']}>
						<img src='/auth/lock.svg' alt='lock' />
						<Input
							id='confirmPassword'
							value={formData.confirmPassword}
							onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
							name='confirmPassword'
							type='password'
							placeholder='Подтвердите пароль'
							isValid={!errors.confirmPassword}
							required
						/>
					</div>
					{errors.confirmPassword && <div className={styles['field-error']}>{errors.confirmPassword}</div>}

					<button className={styles['form-button']} type='submit' disabled={isRegistering || !isCodeSent}>
						{isRegistering ? 'Регистрация...' : 'Зарегистрироваться'}
					</button>
				</form>

				<p className={styles['login-link']}>
					Уже есть аккаунт? <NavLink to='/auth/login'>Войти</NavLink>
				</p>
			</div>
		</div>
	);
};

export default Register;
