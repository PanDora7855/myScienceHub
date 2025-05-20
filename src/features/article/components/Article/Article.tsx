import { IArticle } from './Article.props';
import styles from './Article.module.scss';
import { NavLink } from 'react-router';

const Article = ({ props }: { props: IArticle }) => {
	const { abstract, profiles, created_at, tags, title, updated_at } = props;
	return (
		<div className={styles['article-container']}>
			<h2>{title}</h2>
			<p>
				<strong>Аннотация: </strong>
				{abstract}
			</p>
			<p>
				<strong>Создано: </strong>
				{new Date(created_at).toLocaleDateString()}
			</p>
			{!!updated_at && (
				<p>
					<strong>Обновлено: </strong>
					{new Date(updated_at).toLocaleDateString()}
				</p>
			)}
			<p className={styles['authors']}>
				<strong>Авторы: </strong>
				{profiles?.map(({ first_name, last_name }) => `${first_name} ${last_name}`).join(', ')}
			</p>
			<p>
				{/* TODO Тут надо будет сделать поиск по тегу при нажатии */}
				<strong>Теги: </strong>
				{tags?.map(({ name }) => name).join(', ')}
			</p>
			{/* TODO Тут у дани происходит скачка, если успею надо как то сделать просмотр на другой странице */}
			<NavLink to={'/'}>Посмотреть статью</NavLink>
		</div>
	);
};
export default Article;
