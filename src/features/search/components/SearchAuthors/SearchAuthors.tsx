import { useState } from 'react';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import styles from './SearchAuthors.module.scss';
import Author from '../../../../components/Author/Author';
import { useAuthors } from '../../useAuthors';

const SearchAuthors = () => {
	const [searchTerm, setSearchTerm] = useState('');

	const { authors, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useAuthors(searchTerm);

	return (
		<div className={styles['search-authors']}>
			<div className={styles['serach-bar']}>
				<Input
					className='fullsize'
					placeholder='Поиск по ID или ФИО'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>

			{isLoading ? (
				<div>Загрузка...</div>
			) : (
				<div className={styles['authors']}>
					{authors.length > 0 ? (
						authors.map((author) => <Author key={author.id} props={author} />)
					) : (
						<p>Авторы не найдены</p>
					)}
				</div>
			)}

			{hasNextPage && (
				<div className={styles['load-more']}>
					<Button className='white' onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
						{isFetchingNextPage ? 'Загрузка...' : 'Загрузить еще'}
					</Button>
				</div>
			)}
		</div>
	);
};

export default SearchAuthors;
