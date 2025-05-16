import { useEffect, useRef, useState } from 'react';
import styles from './BurgerMenu.module.scss';
import cn from 'classnames';
import { NavLink, useNavigate } from 'react-router';
import Button from '../Button/Button';
import { useAuth } from '../../features/auth/useAuth';
import { useProfile } from '../../features/profile/useProfile';

const BurgerMenu = () => {
	const navigate = useNavigate();
	const { logout } = useAuth();
	const { data } = useProfile();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const burgerRef = useRef<HTMLDivElement | null>(null);

	const handleLogout = () => {
		logout();
		navigate('/auth/login');
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node) &&
				burgerRef.current &&
				!burgerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const toggleMenu = () => setIsOpen(!isOpen);

	return (
		<>
			<div ref={burgerRef} className={styles['burger']} onClick={toggleMenu}>
				<div className={styles['burger-line']}></div>
				<div className={styles['burger-line']}></div>
				<div className={styles['burger-line']}></div>
			</div>

			<div
				ref={menuRef}
				className={cn(styles['side-menu'], {
					[styles['open']]: isOpen
				})}
			>
				<img className={styles['close-btn']} src='/burger/close.svg' alt='Закрыть' onClick={toggleMenu} />

				{/* TODO добавить иконки, сейчас было в падлу :) */}
				<a href='#'>Главная</a>
				<NavLink to={`profile/${data?.id}/overview`}>Мой профиль</NavLink>
				<NavLink to={'search/articles'}>Поиск</NavLink>
				<a href='#'>Подписки</a>
				<a href='#'>Подписчики</a>
				<NavLink to={'settings/profile'}>Настройки</NavLink>

				{/* //TODO реализовать функцию выхода нормально  */}
				<Button onClick={() => handleLogout()}>Выйти</Button>
			</div>
		</>
	);
};

export default BurgerMenu;
