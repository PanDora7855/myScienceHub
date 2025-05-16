import styles from './ProfileOverview.module.scss';
import Article from '../../../components/Article/Article';
import { useProfileById } from '../../../features/profile/useProfileById';
import { useProfilePublicationsById } from '../../../features/profile/useProfilePublicationsById';
import { IArticles } from '../../../components/Article/Article.props';
import { useParams } from 'react-router';

const ProfileOverview = () => {
	const { authorId } = useParams();
	const { data, isLoading: profileLoading } = useProfileById(authorId as string);
	const { publications, isLoading: publicationsLoading } = useProfilePublicationsById(authorId as string);

	if (profileLoading || publicationsLoading) {
		return <div>Загрузка...</div>;
	}

	if (!data) {
		return <div>Пользователь не найден</div>;
	}

	return (
		<div className={styles['container']}>
			<div className={styles['left-side']}>
				<div className={styles['avatar']}>
					<img src='/avatar.svg' alt='Аватар' width={113} height={113} />
				</div>
				<div className={styles['name']}>
					<h2>
						{data.last_name} {data.first_name} {data.middle_name}
					</h2>
				</div>
				<div className={styles['id']}>
					<p>ID: {data.id}</p>
				</div>
				<div className={styles['status']}>
					<p>Учёная степень: {data.academic_degree}</p>
				</div>
				<div className={styles['vac']}>
					<p>VAC: {data.vac}</p>
				</div>
				<div className={styles['id']}>
					<p>Должность: {data.appointment}</p>
				</div>
				<div className={styles['id']}>
					<p>Страна: {data.country}</p>
				</div>
				<div className={styles['follows']}>
					<div className={styles['follow']}>{data.MySubscribesList?.length || 0} подписок</div>
					<div className={styles['following']}>{data.SubscribersList?.length || 0} подписчиков</div>
				</div>
			</div>
			<div className={styles['right-side']}>
				<h2>Последние публикации</h2>
				<div className={styles['publications']}>
					{publications && publications.length > 0 ? (
						publications.map((article: IArticles) => (
							<div className={styles['publication']} key={article.id}>
								<Article props={article} />
							</div>
						))
					) : (
						<p>Пусто</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProfileOverview;
