import { IArticles } from './Article.props';
import styles from './Article.module.scss';
import { NavLink } from 'react-router';

const Article = ({ props }: { props: IArticles }) => {
	const { annotation, authors, createdAt, tags: tags, title, updatedAt } = props;
	return (
		<div className={styles['article-container']}>
			<h2>{title}</h2>
			<p>
				<strong>Аннотация: </strong>
				{annotation}
			</p>
			<p>
				<strong>Создано: </strong>
				{new Date(createdAt).toLocaleDateString()}
			</p>
			{!!updatedAt && (
				<p>
					<strong>Обновлено: </strong>
					{new Date(updatedAt).toLocaleDateString()}
				</p>
			)}
			<p className={styles['authors']}>
				<strong>Авторы: </strong>
				{authors.join(', ')}
			</p>
			<p>
				{/* TODO Тут надо будет сделать поиск по тегу при нажатии */}
				<strong>Теги: </strong>
				{tags.join(', ')}
			</p>
			{/* TODO Тут у дани происходит скачка, если успею надо как то сделать просмотр на другой странице */}
			<NavLink to={'/'}>Посмотреть статью</NavLink>
		</div>
	);
};
export default Article;
