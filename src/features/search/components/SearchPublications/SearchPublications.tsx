import { useState } from 'react';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import styles from './SearchPublications.module.scss';
import Article from '../../../article/components/Article/Article';
import { useArticles } from '../../../article/useArticles';
import { useSearchArticles } from '../../../article/useSearchArticles';
import Filter from '../../../../components/Filter/Filter';
import { useTags } from '../../useTags';
import { ITag } from '../../../article/components/Article/Article.props';

const SearchPublications = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [selectedTagsId, setSelectedTagsId] = useState<number[]>([]);

	// Используем один из двух хуков в зависимости от состояния поиска
	const { articles: allArticles, isLoading: allLoading } = useArticles();
	const { articles: searchResults, isLoading: searchLoading } = useSearchArticles(searchTerm, selectedTagsId);
	const { data } = useTags();

	const isLoading = searchTerm ? searchLoading : allLoading;
	const articles = searchTerm || selectedTagsId ? searchResults : allArticles;

	const handleApplyTags = (tags: number[]) => {
		setSelectedTagsId(tags);
		setIsModalOpen(false);
	};

	return (
		<div className={styles['search-articles']}>
			{isModalOpen && (
				<Filter
					tags={data as ITag[]}
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
				{/* TODO сделать сортировку */}
				<Button className='purple'>Сортировка</Button>
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
		</div>
	);
};

export default SearchPublications;
