import { createPortal } from 'react-dom';
import styles from './Filter.module.scss';
import { ITag } from '../../features/article/components/Article/Article.props';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';
import cn from 'classnames';

const Filter = ({
	tags,
	onClick,
	onApplyTags,
	selectedTags
}: {
	tags: ITag[];
	onClick: () => void;
	onApplyTags: (tags: number[]) => void;
	selectedTags: number[];
}) => {
	const [selectedTagsId, setSelectedTagsId] = useState<number[]>([...selectedTags]);
	const [search, setSearch] = useState<string>('');

	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, []);

	const handleClick = (id: number) => {
		if (selectedTagsId.includes(id)) {
			setSelectedTagsId((ids) => ids.filter((tagId) => tagId !== id));
		} else {
			setSelectedTagsId([...selectedTagsId, id]);
		}
	};

	return createPortal(
		<div className={styles['filter-all']}>
			<div className={styles['modal-content']}>
				<div className={styles['modal-header']}>
					<h2>Выберите теги</h2>
					<img src='/burger/close.svg' alt='Закрыть' onClick={onClick} />
				</div>
				<Input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className='asd'
					placeholder='Поиск тегов...'
				/>
				<div className={styles['tags-container']}>
					{tags
						?.map((tag) => (
							<button
								className={cn(styles['tag'], {
									[styles['selected']]: selectedTagsId.includes(tag.id)
								})}
								key={tag.id}
								onClick={() => handleClick(tag.id)}
							>
								{tag.name}
							</button>
						))
						.filter((tag) => tag.props.children.toLowerCase().includes(search.toLowerCase()))}
				</div>
				<div className={styles['modal-buttons']}>
					<Button className='green' onClick={() => onApplyTags(selectedTagsId)}>
						Применить
					</Button>
					<Button className='red' onClick={() => onApplyTags([])}>
						Сбросить фильтры
					</Button>
				</div>
			</div>
		</div>,
		document.body
	);
};
export default Filter;
