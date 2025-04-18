import { Outlet } from 'react-router';
import Header from '../../components/Header/Header';
import Tabs from '../../components/Tabs/Tabs';
import styles from './MainLayout.module.scss';
import TopTitle from '../../components/TopTitle/TopTitle';

// Это надо будет убрать после того как доавлю пропсы
const tabsItems = [
	{ label: 'О себе', linkTo: '/profile' },
	{ label: 'Безопасность', linkTo: '/security' }
];

const MainLayout = () => {
	return (
		<>
			<Header />
			<main className={styles['main']}>
				{/* TODO тут надо вставлять пропсы а не просто текст */}
				<div className={styles['main-top']}>
					<TopTitle title='Настройки' secondTitle='О себе' />
					<Tabs tabs={tabsItems} />
				</div>
				<div className={styles['main-content-all']}>
					<div className={styles['main-header']}></div>
					<div className={styles['main-content']}>
						<Outlet />
					</div>
				</div>
			</main>
		</>
	);
};
export default MainLayout;
