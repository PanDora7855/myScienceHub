import { useEffect, useState } from 'react';
import { jsonApiInstance } from '../../../shared/api/api-instance';
import styles from './ProfileOverview.module.scss';
import { IArticles, IProfiles } from '../../../components/Article/Article.props';
import Article from '../../../components/Article/Article';

const ProfileOverview = () => {
	const [articles, setArticles] = useState<IArticles[]>([]);
	const [user, setUser] = useState<IProfiles>();

	async function getArticles() {
		await jsonApiInstance
			.get('/getUserData')
			.then((res) => res.data.Publications)
			.then((res) => setArticles(res));
		// .then((res) => console.log(res));
	}

	async function getUser() {
		await jsonApiInstance('/getUserData')
			.then((res) => res.data)
			// .then((res) => console.log(res));
			.then((res) => setUser(res));
	}
	useEffect(() => {
		getArticles();
		getUser();
	}, []);

	return (
		<div className={styles['container']}>
			<div className={styles['left-side']}>
				<div className={styles['avatar']}>
					<img src='/avatar.svg' alt='Аватар' width={113} height={113} />
				</div>
				<div className={styles['name']}>
					<h2>
						{user?.last_name} {user?.first_name} {user?.middle_name}
					</h2>
				</div>
				<div className={styles['id']}>
					<p>ID: {user?.id}</p>
				</div>
				<div className={styles['status']}>
					<p>Учёная степень: {user?.academic_degree}</p>
				</div>
				<div className={styles['vac']}>
					<p>VAC: {user?.vac}</p>
				</div>
				<div className={styles['id']}>
					<p>Должность: {user?.appointment}</p>
				</div>
				<div className={styles['id']}>
					<p>Страна: {user?.country}</p>
				</div>
				<div className={styles['follows']}>
					<div className={styles['follow']}>0 подпискок</div>
					<div className={styles['following']}>0 подписчиков</div>
				</div>
			</div>
			<div className={styles['right-side']}>
				<h2>Последние публикации</h2>
				<div className={styles['publications']}>
					{articles.length ? (
						articles.map((article) => (
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
