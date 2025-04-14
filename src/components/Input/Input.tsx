import cn from 'classnames';
import styles from './Input.module.scss';
import { forwardRef } from 'react';
import { InputProps } from './Input.props';

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, isValid = true, ...props }, ref) {
	return (
		<input
			{...props}
			ref={ref}
			className={cn(styles['input'], className, {
				[styles['invalid']]: !isValid
			})}
		/>
	);
});

export default Input;
