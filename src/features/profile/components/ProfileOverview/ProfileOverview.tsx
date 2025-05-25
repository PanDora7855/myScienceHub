import styles from './ProfileOverview.module.scss';
import Article from '../../../article/components/Article/Article';
import { useProfileById } from '../../useProfileById';
import { useParams, NavLink } from 'react-router';
import { useProfile } from '../../useProfile';
import { IArticle } from '../../../../helpers/interfaces';

const ProfileOverview = () => {
	const { authorId } = useParams();
	const { data, isLoading: profileLoading } = useProfileById(authorId as string);
	const { data: currentUserData } = useProfile();

	if (profileLoading) {
		return <div>Загрузка...</div>;
	}

	if (!data?.Profile) {
		return <div>Пользователь не найден</div>;
	}

	const isOwnProfile = currentUserData?.id === data.Profile.id;

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
					<p>Учёная степень: {data.Profile.academic_degree ?? 'Не указана'}</p>
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
					{isOwnProfile ? (
						<>
							<NavLink to='/subscribes' className={styles['follow-link']}>
								<div className={styles['follow']}>
									{data.Profile.MySubscribesList?.length || 0} подписок
								</div>
							</NavLink>
							<NavLink to='/subscribers' className={styles['follow-link']}>
								<div className={styles['following']}>
									{data.Profile.SubscribersList?.length || 0} подписчиков
								</div>
							</NavLink>
						</>
					) : (
						<>
							<div className={styles['follow']}>
								{data.Profile.MySubscribesList?.length || 0} подписок
							</div>
							<div className={styles['following']}>
								{data.Profile.SubscribersList?.length || 0} подписчиков
							</div>
						</>
					)}
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
