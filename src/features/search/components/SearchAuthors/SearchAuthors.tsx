import { useEffect, useState } from 'react';
import Input from '../../../../components/Input/Input';
import styles from './SearchAuthors.module.scss';
import Author from '../../../../components/Author/Author';
import { useAuthors } from '../../useAuthors';
import PaginationButtons from '../../../../components/PaginationButtons/PaginationButtons';

const SearchAuthors = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const { authors, isLoading, totalPages } = useAuthors(searchTerm, currentPage, 10, 0);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);

		if (searchTerm) {
			setCurrentPage(1);
		}
	};

	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm]);

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
			<div className={styles['buttons']}>
				{totalPages > 1 && (
					<PaginationButtons
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				)}
			</div>
		</div>
	);
};

export default SearchAuthors;
