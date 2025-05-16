import { IAuthor } from './Author.props';
import styles from './Author.module.scss';
import { NavLink } from 'react-router';

const Author = ({ props }: { props: IAuthor }) => {
	const {
		first_name,
		last_name,
		middle_name,
		academic_degree,
		country,
		followers,
		id,
		appointment,
		publications,
		vac
	} = props;
	return (
		<div className={styles['author-container']}>
			<h2>{`${last_name} ${first_name} ${middle_name}`}</h2>
			<p>
				<strong>ID: </strong>
				{id}
			</p>
			<p>
				<strong>Ученая степень: </strong>
				{academic_degree ? academic_degree : 'Не указана'}
			</p>
			<p>
				<strong>ВАК: </strong>
				{vac}
			</p>
			<p>
				<strong>Должность: </strong>
				{appointment}
			</p>
			<p>
				<strong>Страна: </strong>
				{country}
			</p>
			<p>
				<strong>Подписчики: </strong>
				{followers}
			</p>
			<p>
				<strong>Публикации: </strong>
				{publications}
			</p>
			<NavLink to={`/profile/${id}/overview`}>Посмотреть профиль</NavLink>
		</div>
	);
};
export default Author;
