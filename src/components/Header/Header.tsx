import styles from './Header.module.scss';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

const Header = () => {
	return (
		<div className={styles['container']}>
			<header className={styles['header']}>
				<div className={styles['header-left']}>
					<BurgerMenu />
					<div className={styles['logo']}>
						<img src='/logo.png' alt='Логотип' width={34} height={34} />
						<p className={styles['logo-name']}>Sciencehub</p>
					</div>
				</div>

				<img className={styles['header-right']} src='/avatar.svg' alt='Аватар' width={40} height={40} />
			</header>
			<div className={styles['line']}></div>
		</div>
	);
};
export default Header;
