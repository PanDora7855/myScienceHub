import styles from './ProfileOverview.module.scss';
import Article from '../../../article/components/Article/Article';
import { useProfileById } from '../../useProfileById';
import { useParams, NavLink } from 'react-router';
import { useProfile } from '../../useProfile';
import { IArticle } from '../../../../helpers/interfaces';
import Button from '../../../../components/Button/Button';
import { useState } from 'react';
import { useSubscribeMutation, useUnsubscribeMutation } from '../../useSubscribeMutation';
import { useGetLastPublicationsMutation } from '../../useGetLastPublicationsMutation';

const ProfileOverview = () => {
	const { authorId } = useParams();
	const { data, isLoading: profileLoading } = useProfileById(authorId as string);
	const { data: currentUserData } = useProfile();
	const { downloadFile, isLoading } = useGetLastPublicationsMutation();
	const newDataPublications = data?.Profile.Publications?.slice(0, 2);

	const subscribeMutation = useSubscribeMutation(authorId as string);
	const unsubscribeMutation = useUnsubscribeMutation(authorId as string);

	const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

	const handleSubscribe = () => {
		setIsSubscribed(true);
		subscribeMutation.mutate();
	};

	const handleUnsubscribe = () => {
		setIsSubscribed(false);
		unsubscribeMutation.mutate();
	};

	const [countPublications, setCountPublications] = useState(10);
	const [dateStart, setDateStart] = useState('');
	const [dateEnd, setDateEnd] = useState('');
	const [fileType, setFileType] = useState(0);

	const handleDownload = () => {
		downloadFile(countPublications, new Date(dateEnd), new Date(dateStart), fileType);
	};

	if (profileLoading) {
		return <div>Загрузка...</div>;
	}

	if (!data?.Profile) {
		return <div>Пользователь не найден</div>;
	}

	const isOwnProfile = currentUserData?.id === data.Profile.id;

	return (
		<div className={styles['container']}>
			<div className={styles['top']}>
				<div className={styles['top-left']}>
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
						<p>ВАК: {data.Profile.vac.length > 0 ? data.Profile.vac : 'Не указан'}</p>
					</div>
					<div className={styles['id']}>
						<p>Должность: {data.Profile.appointment}</p>
					</div>
					<div className={styles['id']}>
						<p>Страна: {data.Profile.country}</p>
					</div>
					<div className={styles['id']}>
						<p>Страна: {data.Profile.gender}</p>
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
					{!isOwnProfile &&
						(isSubscribed ? (
							<Button className='red' onClick={() => handleUnsubscribe()}>
								Отписаться
							</Button>
						) : (
							<Button className='purple' onClick={() => handleSubscribe()}>
								Подписаться
							</Button>
						))}
				</div>
				<div className={styles['top-right']}>
					<div className={styles['filters']}>
						<h3>Фильтры публикаций</h3>
						<div className={styles['filters__row']}>
							<div className={styles['filters__field']}>
								<p>Кол-во публикаций:</p>
								<input
									type='number'
									min='1'
									value={countPublications}
									onChange={(e) => setCountPublications(+e.target.value)}
								/>
							</div>
							<div className={styles['filters__field']}>
								<p>Дата начала:</p>
								<input type='date' value={dateStart} onChange={(e) => setDateStart(e.target.value)} />
							</div>
							<div className={styles['filters__field']}>
								<p>Дата окончания:</p>
								<input type='date' value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} />
							</div>
							<div className={styles['filters__field']}>
								<p>Тип файла:</p>
								<select value={fileType} onChange={(e) => setFileType(+e.target.value)}>
									<option value='0'>Word</option>
									<option value='1'>Excel</option>
									<option value='2'>LibraWord</option>
									<option value='3'>LibraExcel</option>
								</select>
							</div>
						</div>
						{isLoading ? (
							<button className={styles['filters__button']} disabled>
								<div className={styles['loading-spinner']}></div>
							</button>
						) : (
							<button className={styles['filters__button']} onClick={handleDownload}>
								📥 Скачать список публикаций
							</button>
						)}
					</div>
				</div>
			</div>
			<div className={styles['bottom']}>
				<h2>Последние публикации</h2>
				<div className={styles['publications']}>
					{data.Profile.Publications && data.Profile.Publications.length > 0 ? (
						newDataPublications?.map((article: IArticle) => (
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
