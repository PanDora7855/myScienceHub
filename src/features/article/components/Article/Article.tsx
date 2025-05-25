import styles from './Article.module.scss';
import { NavLink } from 'react-router';
import { useProfile } from '../../../profile/useProfile';
import { IArticle } from '../../../../helpers/interfaces';

const Article = ({ props }: { props: IArticle }) => {
	const { id, abstract, profiles, created_at, tags, title, updated_at, owner_id } = props;
	const { data: currentUserData } = useProfile();

	const isOwnProfile = currentUserData?.id === owner_id;

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
			<div className={styles['buttons']}>
				<NavLink className={styles['watch']} to={'/'}>
					📄 Посмотреть статью
				</NavLink>
				{isOwnProfile && (
					<NavLink className={styles['edit']} to={`/edit-publication/${id}`}>
						✏️ Редактировать
					</NavLink>
				)}
			</div>
		</div>
	);
};
export default Article;
