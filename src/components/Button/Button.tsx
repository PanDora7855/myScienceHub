import { IButton } from './Button.props';
import styles from './Button.module.scss';
import cn from 'classnames';

const Button = ({ children, className, ...props }: IButton) => {
	return (
		<button className={cn(styles['button'], styles[`${className}`])} {...props}>
			{children}
		</button>
	);
};
export default Button;
