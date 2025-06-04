import { FormEvent, useState } from 'react';
import Input from '../../../../components/Input/Input';
import styles from './SettingsAbout.module.scss';
import Button from '../../../../components/Button/Button';
import { useProfile } from '../../useProfile';
import { useUpdateUserProfile } from '../../useUpdateUserProfile';
import { IOmitData } from './SettingsAbout.props';

const SettingsAbout = () => {
	const { data, error, isLoading } = useProfile();
	const { updateUser, isSuccess, error: updateError } = useUpdateUserProfile();

	const omitData: IOmitData = {
		last_name: data?.last_name,
		first_name: data?.first_name,
		middle_name: data?.middle_name,
		academic_degree: data?.academic_degree,
		gender: data?.gender,
		country: data?.country,
		vac: data?.vac,
		appointment: data?.appointment
	};

	const [input, setInput] = useState<IOmitData>({
		last_name: data?.last_name,
		first_name: data?.first_name,
		middle_name: data?.middle_name,
		academic_degree: data?.academic_degree,
		gender: data?.gender,
		country: data?.country,
		vac: data?.vac,
		appointment: data?.appointment
	});

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// e.currentTarget.reset();
		const newUserData: IOmitData = {};
		for (const [key, value] of Object.entries(input)) {
			if (value !== '' && value !== undefined && value !== omitData[key as keyof IOmitData]) {
				newUserData[key as keyof IOmitData] = value;
			}
		}
		if (Object.keys(newUserData).length > 0) updateUser(newUserData);
	};

	if (isLoading) return <div>Загрузка...</div>;

	if (error) return <div>Произошла ошибка</div>;

	return (
		<>
			{updateError && <div className={styles['error-message']}>{updateError?.response?.data.error}</div>}
			{isSuccess && <div className={styles['success-message']}>Профиль успешно обновлен</div>}
			<form className={styles['settings']} onSubmit={handleSubmit}>
				<div className={styles['editable-fields']}>
					<div className={styles['edit-field']}>
						<p>Фамилия</p>
						<Input
							className='darker'
							name='last_name'
							value={input.last_name}
							onChange={(e) => setInput({ ...input, last_name: e.target.value })}
							placeholder={data?.last_name}
						/>
					</div>
					<div className={styles['edit-field']}>
						<p>Имя</p>
						<Input
							className='darker'
							name='first_name'
							value={input.first_name}
							onChange={(e) => setInput({ ...input, first_name: e.target.value })}
							placeholder={data?.first_name}
						/>
					</div>
					<div className={styles['edit-field']}>
						<p>Отчество</p>
						<Input
							className='darker'
							name='middle_name'
							value={input.middle_name}
							onChange={(e) => setInput({ ...input, middle_name: e.target.value })}
							placeholder={data?.middle_name}
						/>
					</div>
					<div className={styles['edit-field']}>
						<p>Страна</p>
						<Input
							className='darker'
							name='country'
							value={input.country}
							onChange={(e) => setInput({ ...input, country: e.target.value })}
							placeholder={data?.country}
						/>
					</div>
					<div className={styles['edit-field']}>
						<p>Учёная степень</p>
						<Input
							className='darker'
							name='academic_degree'
							value={input.academic_degree}
							onChange={(e) => setInput({ ...input, academic_degree: e.target.value })}
							placeholder={data?.academic_degree}
						/>
					</div>
					<div className={styles['edit-field']}>
						<p>ВАК</p>
						<Input
							className='darker'
							name='vac'
							value={input.vac}
							onChange={(e) => setInput({ ...input, vac: e.target.value })}
							placeholder={data?.vac}
						/>
					</div>
					<div className={styles['edit-field']}>
						<p>Должность</p>
						<Input
							className='darker'
							name='appointment'
							value={input.appointment}
							onChange={(e) => setInput({ ...input, appointment: e.target.value })}
							placeholder={data?.appointment}
						/>
					</div>
					<div className={styles['edit-field']}>
						<p>Пол</p>
						<select
							value={input?.gender || data?.gender}
							onChange={(e) => setInput({ ...input, gender: +e.target.value })}
						>
							<option value={3}>Не указан</option>
							<option value={2}>Женский</option>
							<option value={1}>Мужской</option>
						</select>
					</div>
				</div>
				<Button className='green'>Сохранить</Button>
			</form>
		</>
	);
};
export default SettingsAbout;
