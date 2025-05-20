import styles from './ProfileOverview.module.scss';
import Article from '../../../article/components/Article/Article';
import { useProfileById } from '../../useProfileById';
import { IArticle } from '../../../article/components/Article/Article.props';
import { useParams } from 'react-router';

const ProfileOverview = () => {
	const { authorId } = useParams();
	const { data, isLoading: profileLoading } = useProfileById(authorId as string);

	if (profileLoading) {
		return <div>Загрузка...</div>;
	}

	if (!data.Profile) {
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
						{data.Profile.last_name} {data.Profile.first_name} {data.Profile.middle_name}
					</h2>
				</div>
				<div className={styles['id']}>
					<p>ID: {data.Profile.id}</p>
				</div>
				<div className={styles['status']}>
					<p>Учёная степень: {data.Profile.academic_degree}</p>
				</div>
				<div className={styles['vac']}>
					<p>VAC: {data.Profile.vac}</p>
				</div>
				<div className={styles['id']}>
					<p>Должность: {data.Profile.appointment}</p>
				</div>
				<div className={styles['id']}>
					<p>Страна: {data.Profile.country}</p>
				</div>
				<div className={styles['follows']}>
					<div className={styles['follow']}>{data.Profile.MySubscribesList?.length || 0} подписок</div>
					<div className={styles['following']}>{data.Profile.SubscribersList?.length || 0} подписчиков</div>
				</div>
			</div>
			<div className={styles['right-side']}>
				<h2>Последние публикации</h2>
				<div className={styles['publications']}>
					{data.Profile.Publications && data.Profile.Publications.length > 0 ? (
						data.Profile.Publications.map((article: IArticle) => (
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
