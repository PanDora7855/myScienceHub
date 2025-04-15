import Tabs from '../../../components/Tabs/Tabs';
import TopTitle from '../../../components/TopTitle/TopTitle';
import style from './SettingsAbout.module.scss';

const tabsItems = [
	{ label: 'О себе', linkTo: '/settings/profile', isActive: true },
	{ label: 'Безопасность', linkTo: '/settings/security', isActive: false }
];

const SettingsAbout = () => {
	return (
		//TODO надо сделать отдельный layout т.к. повторяется и в настройках, и в профиле (именно рамки этой)
		<div className={style['settings']}>
			<main className={style['main']}>
				<TopTitle
					title='Настройки'
					secondTitle='О себе'
				/>
				<Tabs tabs={tabsItems} />
				<div className={style['main-general']}></div>
			</main>
			<footer className={style['footer']}></footer>
		</div>
	);
};
export default SettingsAbout;
