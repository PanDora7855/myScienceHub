import styles from './Article.module.scss';
import { NavLink, useNavigate } from 'react-router';
import { useProfile } from '../../../profile/useProfile';
import { IArticle } from '../../../../helpers/interfaces';
import Button from '../../../../components/Button/Button';

const Article = ({ props }: { props: IArticle }) => {
	const navigate = useNavigate();
	const { id, abstract, profiles, created_at, tags, title, updated_at, owner_id, file_link } = props;
	const { data: currentUserData } = useProfile();

	const isOwnProfile = currentUserData?.id === owner_id;

	const navigateToUserProfile = (id: number) => {
		navigate(`/profile/${id}/overview`);
	};

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
			{(profiles?.length as number) > 0 && (
				<div className={styles['authors']}>
					<strong>Совторы: </strong>
					<div className={styles['profiles']}>
						{profiles?.map(({ first_name, last_name, id }) => (
							<Button
								key={id}
								className='purple'
								onClick={() => navigateToUserProfile(id)}
							>{`${first_name} ${last_name}`}</Button>
						))}
					</div>
				</div>
			)}
			<p>
				{/* TODO Тут надо будет сделать поиск по тегу при нажатии */}
				<strong>Теги: </strong>
				{tags?.map(({ name }) => name).join(', ')}
			</p>
			{/* TODO Тут у дани происходит скачка, если успею надо как то сделать просмотр на другой странице */}
			<div className={styles['buttons']}>
				<a href={file_link} target='_blank' rel='noopener noreferrer' className={styles['watch']}>
					📄 Посмотреть статью
				</a>
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
