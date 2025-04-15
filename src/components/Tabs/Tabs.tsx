import { ITabs } from './Tabs.props';
import styles from './Tabs.module.scss';
import cn from 'classnames';

const Tabs = ({ tabs }: ITabs) => {
	return (
		<>
			<ul className={styles['tabs']}>
				{tabs.map((t, index) => (
					<li
						key={index}
						className={styles['tab-item']}
					>
						<a
							className={cn(styles['item-link'], {
								[styles['active']]: t.isActive
							})}
							href={t.linkTo}
						>
							{t.label}
						</a>
						{t.isActive && <div className={styles['link-line']}></div>}
					</li>
				))}
			</ul>
			<hr className={styles['line']} />
		</>
	);
};
export default Tabs;
