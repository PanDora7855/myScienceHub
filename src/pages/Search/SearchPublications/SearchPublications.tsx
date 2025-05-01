import { useEffect, useState } from 'react';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import { apiInstance } from '../../../services/api-instance';
import styles from './SearchPublications.module.scss';
import { IArticles } from '../../../components/Article/Article.props';
import Article from '../../../components/Article/Article';

const SearchPublications = () => {
	const [articles, setArticles] = useState<IArticles[]>([]);

	async function getArticles() {
		await apiInstance('/articles')
			.then((res) => res.data)
			.then((res) => setArticles(res[0]));
	}

	useEffect(() => {
		getArticles();
	}, []);
	return (
		<div className={styles['search-articles']}>
			<div className={styles['search-bar']}>
				<Input className='fullsize' placeholder='Поиск публикаций' />
				<Button className='white'>Сортировать</Button>
				<Button className='green'>Поиск</Button>
			</div>
			<div className={styles['articles']}>
				{articles.map((item) => (
					<Article key={item.id} props={item} />
				))}
			</div>
		</div>
	);
};
export default SearchPublications;
