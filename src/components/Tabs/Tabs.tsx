import { ITabs } from './Tabs.props';
import styles from './Tabs.module.scss';
import cn from 'classnames';
import { NavLink, useLocation } from 'react-router';
import { useEffect, useRef, useState } from 'react';

// TODO присутствует маленький баг. При жесткой перезагрузке из за того что шрифты не успевают прогрузиться, линия имеет не правильный оффсет и ширину

const Tabs = ({ tabs }: ITabs) => {
	const location = useLocation();
	const tabRefs = useRef<(HTMLLIElement | null)[]>([]);
	const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

	const prevLocation = location.pathname.split('/').slice(0, -1).join('/');

	useEffect(() => {
		const activeIndex = tabs.findIndex((tab) => location.pathname.includes(tab.linkTo));
		const activeTab = tabRefs.current[activeIndex];
		if (activeTab) {
			const { offsetLeft, offsetWidth } = activeTab;
			setUnderlineStyle({
				left: offsetLeft,
				width: offsetWidth
			});
		}
	}, [location.pathname, tabs]);

	return (
		<div style={{ position: 'relative' }}>
			<ul className={styles['tabs']}>
				{tabs.map(({ label, linkTo }, index) => (
					<li
						key={index}
						ref={(el) => {
							tabRefs.current[index] = el;
						}}
						className={styles['tab-item']}
					>
						<NavLink
							to={`${prevLocation}/${linkTo}`}
							className={({ isActive }) =>
								cn(styles['item-link'], {
									[styles['active']]: isActive
								})
							}
						>
							{label}
						</NavLink>
					</li>
				))}
				<div
					className={styles['link-line']}
					style={{
						left: underlineStyle.left,
						width: underlineStyle.width
					}}
				/>
			</ul>
		</div>
	);
};

export default Tabs;
