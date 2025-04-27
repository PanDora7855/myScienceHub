import { useEffect, useState } from 'react';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import { axiosFetching } from '../../../services/api';
import styles from './SearchPublications.module.scss';
import { IArticles } from '../../../components/Article/Article.props';
import Article from '../../../components/Article/Article';

const SearchPublications = () => {
	const [articles, setArticles] = useState<IArticles[]>([]);

	async function getAuthors() {
		await axiosFetching('/articles')
			.then((res) => res.data)
			.then((res) => setArticles(res[0]));
	}

	useEffect(() => {
		getAuthors();
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
