import { IPaginationButtons } from './PaginationButtons.props';
import styles from './PaginationButtons.module.scss';
import cn from 'classnames';

const PaginationButtons = ({ currentPage, totalPages, onPageChange }: IPaginationButtons) => {
	const handlePageChange = (page: number) => {
		onPageChange(page);

		// Прокрутка вверх после смены страницы
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};

	if (totalPages <= 7) {
		return (
			<div className={styles['pagination']}>
				{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
					<button
						key={page}
						className={cn(styles['page-button'], {
							[styles['active']]: page === currentPage
						})}
						onClick={() => handlePageChange(page)}
					>
						{page}
					</button>
				))}
			</div>
		);
	}

	const pages: (number | string)[] = [];

	pages.push(1);

	let startPage = Math.max(2, currentPage - 2);
	let endPage = Math.min(totalPages - 1, currentPage + 2);

	if (currentPage <= 4) {
		startPage = 2;
		endPage = Math.min(6, totalPages - 1);
	} else if (currentPage >= totalPages - 3) {
		startPage = Math.max(totalPages - 5, 2);
		endPage = totalPages - 1;
	}

	// Добавляем многоточие после первой страницы если нужно
	if (startPage > 2) {
		pages.push('...');
	}

	// Добавляем страницы в диапазоне
	for (let i = startPage; i <= endPage; i++) {
		pages.push(i);
	}

	// Добавляем многоточие перед последней страницей если нужно
	if (endPage < totalPages - 1) {
		pages.push('...');
	}

	// Всегда добавляем последнюю страницу (если она не равна первой)
	if (totalPages > 1) {
		pages.push(totalPages);
	}

	return (
		<div className={styles['pagination']}>
			<button
				className={cn(styles['nav-button'], {
					[styles['disabled']]: currentPage === 1
				})}
				onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				←
			</button>

			{pages.map((page, index) => (
				<span key={index}>
					{typeof page === 'number' ? (
						<button
							className={cn(styles['page-button'], {
								[styles['active']]: page === currentPage
							})}
							onClick={() => handlePageChange(page)}
						>
							{page}
						</button>
					) : (
						<span className={styles['ellipsis']}>{page}</span>
					)}
				</span>
			))}

			<button
				className={cn(styles['nav-button'], {
					[styles['disabled']]: currentPage === totalPages
				})}
				onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				→
			</button>
		</div>
	);
};

export default PaginationButtons;
