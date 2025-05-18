import { useState } from 'react';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import styles from './SearchPublications.module.scss';
import Article from '../../../article/components/Article/Article';
import { useArticles } from '../../../article/useArticles';
import { useSearchArticles } from '../../../article/useSearchArticles';

const SearchPublications = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [activeSearch, setActiveSearch] = useState('');

	// Используем один из двух хуков в зависимости от состояния поиска
	const { articles: allArticles, isLoading: allLoading } = useArticles();
	const { articles: searchResults, isLoading: searchLoading } = useSearchArticles(activeSearch);

	const isLoading = activeSearch ? searchLoading : allLoading;
	const articles = activeSearch ? searchResults : allArticles;

	const handleSearch = () => {
		setActiveSearch(searchTerm);
	};

	return (
		<div className={styles['search-articles']}>
			<div className={styles['search-bar']}>
				<Input
					className='fullsize'
					placeholder='Поиск публикаций'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<Button className='white'>Сортировать</Button>
				<Button className='green' onClick={handleSearch}>
					Поиск
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
		</div>
	);
};

export default SearchPublications;
