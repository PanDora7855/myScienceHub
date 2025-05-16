import { MouseEvent, useState } from 'react';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import styles from './SettingsSecurity.module.scss';

const SettingsSecurity = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const handleClick = (e: MouseEvent) => {
		e.preventDefault();
		console.log('Работает');
	};

	return (
		<>
			<div className={styles['security']}>
				<div className={styles['field-button']}>
					<div className={styles['edit-field']}>
						<p>Почта</p>
						<Input className='darker' value={email} onChange={(e) => setEmail(e.target.value)} />
						<Button className='purple' onClick={handleClick}>
							Изменить
						</Button>
					</div>
				</div>
				<div className={styles['field-button']}>
					<div className={styles['edit-field']}>
						<p>Пароль</p>
						<Input className='darker' value={password} onChange={(e) => setPassword(e.target.value)} />
						<Button className='purple' onClick={handleClick}>
							Изменить
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};
export default SettingsSecurity;
