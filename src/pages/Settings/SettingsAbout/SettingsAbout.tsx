import { MouseEvent } from 'react';
import Input from '../../../components/Input/Input';
import styles from './SettingsAbout.module.scss';
import { ISettingsAbout } from './SettingsAbout.props';
import Button from '../../../components/Button/Button';
import { jsonApiInstance } from '../../../shared/api/api-instance';

const SettingsAbout = ({ info }: ISettingsAbout) => {
	const handleClick = (e: MouseEvent) => {
		e.preventDefault();
		console.log('Заебись');
		jsonApiInstance('/tags').then((res) => console.log(res));
	};

	return (
		<>
			<div className={styles['settings']}>
				<div className={styles['top-info']}>
					<img src='/avatar.svg' alt='аватар' width={113} height={113} />
					{/* TODO тут надо прокидовать пропсы */}
					<div className={styles['text-info']}>
						<h2>Имя пользователя</h2>
						<p>Учёная степень</p>
					</div>
				</div>
				<div className={styles['editable-fields']}>
					{info.map(({ title, value }, index) => (
						<div className={styles['edit-field']} key={index}>
							<p>{title}</p>
							<Input className='darker' placeholder={value} />
						</div>
					))}
				</div>
			</div>
			<Button className='green' onClick={handleClick}>
				Сохранить
			</Button>
		</>
	);
};
export default SettingsAbout;
