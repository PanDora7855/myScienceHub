import { useState } from 'react';
import styles from './Subscribes.module.scss';
import Author from '../../../../components/Author/Author';
import Input from '../../../../components/Input/Input';
import { useSubscribes } from '../../useSubscribes';

const Subscribes = () => {
	const [searchTerm, setSearchTerm] = useState('');

	const { subscribes, isLoading } = useSubscribes(searchTerm);

	console.log(subscribes);

	return (
		<div className={styles['subscribes-container']}>
			<div className={styles['search-bar']}>
				<Input
					className='fullsize'
					placeholder='Поиск по подпискам'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>

			{isLoading ? (
				<div>Загрузка...</div>
			) : (
				<div className={styles['subscribes-list']}>
					{subscribes?.length > 0 ? (
						subscribes?.map((author) => <Author key={author.id} props={author} />)
					) : (
						// <p>{subscribes.map((author) => author.id)}</p>
						<p>У вас пока нет подписок</p>
					)}
				</div>
			)}
		</div>
	);
};

export default Subscribes;
