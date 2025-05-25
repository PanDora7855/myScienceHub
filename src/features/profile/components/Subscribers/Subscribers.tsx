import { useState } from 'react';
import styles from './Subscribers.module.scss';
import Author from '../../../../components/Author/Author';
import Input from '../../../../components/Input/Input';
import { useSubscribers } from '../../useSubscribers';

const Subscribers = () => {
	const [searchTerm, setSearchTerm] = useState('');

	const { subscribers, isLoading } = useSubscribers(searchTerm);

	return (
		<div className={styles['subscribers-container']}>
			<div className={styles['search-bar']}>
				<Input
					className='fullsize'
					placeholder='Поиск по подписчикам'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>

			{isLoading ? (
				<div>Загрузка...</div>
			) : (
				<div className={styles['subscribers-list']}>
					{subscribers.length > 0 ? (
						subscribers.map((author) => <Author key={author.id} props={author} />)
					) : (
						<p>У вас пока нет подписчиков</p>
					)}
				</div>
			)}
		</div>
	);
};

export default Subscribers;
