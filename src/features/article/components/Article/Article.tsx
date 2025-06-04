import styles from './Article.module.scss';
import { NavLink, useNavigate } from 'react-router';
import { useProfile } from '../../../profile/useProfile';
import { IArticle } from '../../../../helpers/interfaces';
import Button from '../../../../components/Button/Button';

const Article = ({ props }: { props: IArticle }) => {
	const navigate = useNavigate();
	const { id, abstract, profiles, created_at, tags, title, updated_at, owner_id, file_link, owner } = props;
	const { data: currentUserData } = useProfile();

	const isOwnProfile = currentUserData?.id === owner_id;

	const navigateToUserProfile = (id: number) => {
		navigate(`/profile/${id}/overview`);
	};

	// Разделяем автора и соавторов
	const coauthors = profiles?.filter((profile) => profile.id !== owner_id) || [];
	const mainAuthor = owner || profiles?.find((profile) => profile.id === owner_id);

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

			{mainAuthor && (
				<div className={styles['authors']}>
					<strong>Автор: </strong>
					<div className={styles['profiles']}>
						<Button className='purple' onClick={() => navigateToUserProfile(mainAuthor.id)}>
							{`${mainAuthor.last_name} ${mainAuthor.first_name}`}
						</Button>
					</div>
				</div>
			)}

			{/* Соавторы */}
			{coauthors.length > 0 && (
				<div className={styles['coauthors']}>
					<strong>Соавторы: </strong>
					<div className={styles['profiles']}>
						{coauthors.map(({ first_name, last_name, id }) => (
							<Button key={id} className='purple' onClick={() => navigateToUserProfile(id)}>
								{`${last_name} ${first_name}`}
							</Button>
						))}
					</div>
				</div>
			)}

			<div className={styles['tags']}>
				<strong>Теги: </strong>
				{tags?.map(({ name, id }) => (
					<span className={styles['tag-btn']} key={id}>
						{name}
					</span>
				))}
			</div>
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
