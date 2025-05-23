import { useState } from 'react';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import styles from './ProfilePublications.module.scss';
import Article from '../../../article/components/Article/Article';
import { useSearchArticles } from '../../../article/useSearchArticles';
import { useProfile } from '../../useProfile';
import Filter from '../../../../components/Filter/Filter';
import { ITag } from '../../../article/components/Article/Article.props';
import { NavLink } from 'react-router';

const ProfilePublications = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [selectedTagsId, setSelectedTagsId] = useState<number[]>([]);

	// Используем один из двух хуков в зависимости от состояния поиска
	const { data: allArticles, isLoading: allLoading } = useProfile();
	const { articles: searchResults, isLoading: searchLoading } = useSearchArticles(searchTerm, selectedTagsId);

	const isLoading = searchTerm ? searchLoading : allLoading;
	const articles = searchTerm || selectedTagsId ? searchResults : allArticles?.Publications;

	const tags = allArticles?.Publications.flatMap((item) => item.tags as ITag[]).filter(
		(tag, index, self) => index === self.findIndex((t) => t.id === tag.id)
	) as ITag[];

	const handleApplyTags = (tags: number[]) => {
		setSelectedTagsId(tags);
		setIsModalOpen(false);
	};

	return (
		<div className={styles['search-articles']}>
			{isModalOpen && (
				<Filter
					tags={tags as ITag[]}
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
				<Button className='purple'>Сортировать</Button>
				<Button className='white' onClick={() => setIsModalOpen(true)}>
					Фильтры
				</Button>
				<Button className='green'>
					<NavLink to={'/create-publication'}>Создать публикацию</NavLink>
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
