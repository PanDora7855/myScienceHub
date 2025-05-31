import { useState } from 'react';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import styles from './ForgotPassword.module.scss';
import { profileApi } from '../../../profile/api';

const ForgotPassword = () => {
	const [inputValue, setInputValue] = useState<string>('');
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleClick = () => {
		setIsOpen(true);
		profileApi.sendVerificationCodeForPassword(inputValue);
	};

	return (
		<div className={styles['forgot-password']}>
			<div className={styles['container']}>
				<h2>Восстановление пароля</h2>
				<Input
					className='darker'
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder='Введите вашу почту'
				/>
				<Button className='purple' onClick={() => handleClick()}>
					Сенить пароль
				</Button>
				{isOpen && <Input placeholder='Введите код' />}
			</div>
		</div>
	);
};
export default ForgotPassword;
