import { Outlet } from 'react-router';
import Header from '../../components/Header/Header';
import Tabs from '../../components/Tabs/Tabs';
import styles from './MainLayout.module.scss';
import TopTitle from '../../components/TopTitle/TopTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

const MainLayout = () => {
	const { title, secondTitle, tabs } = usePageMeta();

	return (
		<>
			<Header />
			<main className={styles['main']}>
				<div className={styles['main-top']}>
					<TopTitle title={title} secondTitle={secondTitle} />
					{tabs.length > 0 && <Tabs tabs={tabs} />}
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
