import { useState } from 'react';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import styles from './ProfilePublications.module.scss';
import Article from '../../../article/components/Article/Article';
import { useSearchArticles } from '../../../article/useSearchArticles';
import { useProfile } from '../../useProfile';
import Filter from '../../../../components/FIlter/Filter';
import { ITag } from '../../../article/components/Article/Article.props';

const ProfilePublications = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [activeSearch, setActiveSearch] = useState('');
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [selectedTagsId, setSelectedTagsId] = useState<number[]>([]);

	// Используем один из двух хуков в зависимости от состояния поиска
	const { data: allArticles, isLoading: allLoading } = useProfile();
	const { articles: searchResults, isLoading: searchLoading } = useSearchArticles(activeSearch);

	const isLoading = activeSearch ? searchLoading : allLoading;
	const articles = activeSearch ? searchResults : allArticles?.Publications;

	const handleSearch = () => {
		setActiveSearch(searchTerm);
	};

	const handleApplyTags = (tags: number[]) => {
		setSelectedTagsId(tags);
		setIsModalOpen(false);
	};

	return (
		<div className={styles['search-articles']}>
			{isModalOpen && (
				<Filter
					tags={allArticles?.Publications[0].tags as ITag[]}
					onClick={() => setIsModalOpen(false)}
					onApplyTags={handleApplyTags}
					selectedTags={selectedTagsId}
				/>
			)}
			<div className={styles['search-bar']}>
				<Input
					className='fullsize'
					placeholder='Поиск публикаций'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<Button className='white' onClick={() => setIsModalOpen(true)}>
					Сортировать
				</Button>
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

export default ProfilePublications;
