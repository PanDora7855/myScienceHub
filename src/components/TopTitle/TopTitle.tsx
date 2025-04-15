import style from './TopTitle.module.scss';
import { ITopTitle } from './TopTitle.props';

const TopTitle = ({ title, secondTitle }: ITopTitle) => {
	return (
		<div className={style['main-top']}>
			<p>{title}</p>
			<h2>{secondTitle}</h2>
		</div>
	);
};
export default TopTitle;
