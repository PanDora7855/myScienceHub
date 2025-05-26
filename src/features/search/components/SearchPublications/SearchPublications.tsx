import { useEffect, useState } from 'react';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import styles from './SearchPublications.module.scss';
import Article from '../../../article/components/Article/Article';
import { useArticles } from '../../../article/useArticles';
import { useSearchArticles } from '../../../article/useSearchArticles';
import Filter from '../../../../components/Filter/Filter';
import { useTags } from '../../useTags';
import PaginationButtons from '../../../../components/PaginationButtons/PaginationButtons';

const SearchPublications = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [selectedTagsId, setSelectedTagsId] = useState<number[]>([]);
	const [sortType, setSortType] = useState<number>(1);
	const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState(1);

	// Используем один из двух хуков в зависимости от состояния поиска
	const { articles: allArticles, isLoading: allLoading } = useArticles();
	const {
		articles: searchResults,
		isLoading: searchLoading,
		totalPages
	} = useSearchArticles(searchTerm, selectedTagsId, currentPage, 10, sortType);
	const { data } = useTags();

	const isLoading = searchTerm || selectedTagsId || sortType ? searchLoading : allLoading;
	const articles = searchTerm || selectedTagsId || sortType ? searchResults : allArticles;

	const handleApplyTags = (tags: number[]) => {
		setSelectedTagsId(tags);
		setIsModalOpen(false);
	};

	const handleSort = (sortType: number) => {
		setSortType(sortType);
		setIsOptionsOpen(false);
	};

	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, selectedTagsId, sortType]);

	return (
		<div className={styles['search-articles']}>
			{isModalOpen && (
				<Filter
					tags={data}
					onClick={() => setIsModalOpen(false)}
					onApplyTags={handleApplyTags}
					selectedIds={selectedTagsId}
				/>
			)}
			<div className={styles['search-bar']}>
				<Input
					className='fullsize'
					placeholder='Поиск публикаций'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<div className={styles['sort']}>
					<Button className='purple' onClick={() => setIsOptionsOpen(!isOptionsOpen)}>
						Сортировка
					</Button>
					{isOptionsOpen && (
						<div className={styles['options']}>
							<p onClick={() => handleSort(1)}>Дата (сначала новые)</p>
							<p onClick={() => handleSort(0)}>Дата (сначала старые)</p>
							<p onClick={() => handleSort(3)}>Название (А-Я)</p>
							<p onClick={() => handleSort(4)}>Название (Я-А)</p>
						</div>
					)}
				</div>
				<Button className='white' onClick={() => setIsModalOpen(true)}>
					Фильтры
				</Button>
			</div>
			{isLoading ? (
				<div>Загрузка...</div>
			) : (
				<div className={styles['articles']}>
					{articles && articles.length > 0 ? (
						articles.map((item) => <Article key={item.id} props={item} />)
					) : (
						<p>Статьи не найдены</p>
					)}
				</div>
			)}
			<div className={styles['buttons']}>
				{totalPages > 1 && (
					<PaginationButtons
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={setCurrentPage}
					/>
				)}
			</div>
		</div>
	);
};

export default SearchPublications;
