import { useEffect, useRef, useState } from 'react';
import styles from './BurgerMenu.module.scss';
import cn from 'classnames';
import { NavLink } from 'react-router';

const BurgerMenu = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const burgerRef = useRef<HTMLDivElement | null>(null);

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

		// Очистка слушателя
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
				<NavLink to={'profile/overview'}>Профиль</NavLink>
				<NavLink to={'search/authors'}>Авторы</NavLink>
				<a href='#'>Подписки</a>
				<a href='#'>Подписчики</a>
				<NavLink to={'settings/profile'}>Настройки</NavLink>
				<a href='#'>Выйти</a>
			</div>
		</>
	);
};

export default BurgerMenu;
