import styles from './ProfileOverview.module.scss';
import { useProfile } from '../../../features/profile/useProfile';
import { useProfilePublications } from '../../../features/profile/useProfilePublications';
import Article from '../../../components/Article/Article';

const ProfileOverview = () => {
	const { profile, isLoading: profileLoading } = useProfile();
	const { publications, isLoading: publicationsLoading } = useProfilePublications();

	if (profileLoading || publicationsLoading) {
		return <div>Загрузка...</div>;
	}

	if (!profile) {
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
						{profile.last_name} {profile.first_name} {profile.middle_name}
					</h2>
				</div>
				<div className={styles['id']}>
					<p>ID: {profile.id}</p>
				</div>
				<div className={styles['status']}>
					<p>Учёная степень: {profile.academic_degree}</p>
				</div>
				<div className={styles['vac']}>
					<p>VAC: {profile.vac}</p>
				</div>
				<div className={styles['id']}>
					<p>Должность: {profile.appointment}</p>
				</div>
				<div className={styles['id']}>
					<p>Страна: {profile.country}</p>
				</div>
				<div className={styles['follows']}>
					<div className={styles['follow']}>{profile.MySubscribesList?.length || 0} подписок</div>
					<div className={styles['following']}>{profile.SubscribersList?.length || 0} подписчиков</div>
				</div>
			</div>
			<div className={styles['right-side']}>
				<h2>Последние публикации</h2>
				<div className={styles['publications']}>
					{publications && publications.length > 0 ? (
						publications.map((article) => (
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
