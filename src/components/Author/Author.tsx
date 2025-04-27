import { IAuthor } from './Author.props';
import styles from './Author.module.scss';
import { NavLink } from 'react-router';

const Author = ({ props }: { props: IAuthor }) => {
	const { name, academic_degree, country, followers, id, position, publications, vac } = props;
	return (
		<div className={styles['author-container']}>
			<h2>{name}</h2>
			<p>
				<strong>ID: </strong>
				{id}
			</p>
			<p>
				<strong>Ученая степень: </strong>
				{academic_degree}
			</p>
			<p>
				<strong>ВАК: </strong>
				{vac}
			</p>
			<p>
				<strong>Должность: </strong>
				{position}
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
			<NavLink to={'/'}>Посмотреть профиль</NavLink>
		</div>
	);
};
export default Author;
