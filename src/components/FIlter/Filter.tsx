import { createPortal } from 'react-dom';
import styles from './Filter.module.scss';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { ITag, IProfile } from '../../helpers/interfaces';

const Filter = ({
	tags,
	authors,
	onClick,
	onApplyTags,
	selectedIds
}: {
	tags?: ITag[] | null;
	authors?: IProfile[] | null;
	onClick: () => void;
	onApplyTags: (tags: number[]) => void;
	selectedIds: number[];
}) => {
	const [selectedTagsId, setSelectedTagsId] = useState<number[]>([...selectedIds]);
	const [selectedAuthorsId, setSelectedAuthorsId] = useState<number[]>([...selectedIds]);
	const [search, setSearch] = useState<string>('');

	// Определяем, что показываем - теги или авторов
	const isTagsMode = !!tags;
	const isAuthorsMode = !!authors;

	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, []);

	const handleTagClick = (id: number) => {
		if (selectedTagsId.includes(id)) {
			setSelectedTagsId((ids) => ids.filter((tagId) => tagId !== id));
		} else {
			setSelectedTagsId([...selectedTagsId, id]);
		}
	};

	const handleAuthorClick = (id: number) => {
		if (selectedAuthorsId.includes(id)) {
			setSelectedAuthorsId((ids) => ids.filter((authorId) => authorId !== id));
		} else {
			setSelectedAuthorsId([...selectedAuthorsId, id]);
		}
	};

	// Фильтрация тегов по поиску
	const filteredTags = tags?.filter((tag) => tag.name.toLowerCase().includes(search.toLowerCase())) || [];

	// Фильтрация авторов по поиску
	const filteredAuthors =
		authors?.filter((author) => {
			const fullName = `${author.first_name} ${author.last_name} ${author.middle_name}`.toLowerCase();
			return fullName.includes(search.toLowerCase());
		}) || [];

	const handleApply = () => {
		if (isTagsMode) {
			onApplyTags(selectedTagsId);
		} else if (isAuthorsMode) {
			onApplyTags(selectedAuthorsId);
		}
	};

	const handleReset = () => {
		if (isTagsMode) {
			setSelectedTagsId([]);
			onApplyTags([]);
		} else if (isAuthorsMode) {
			setSelectedAuthorsId([]);
			onApplyTags([]);
		}
	};

	return createPortal(
		<div className={styles['filter-all']}>
			<div className={styles['modal-content']}>
				<div className={styles['modal-header']}>
					<h2>{isTagsMode ? 'Выберите теги' : 'Выберите авторов'}</h2>
					<img src='/burger/close.svg' alt='Закрыть' onClick={onClick} />
				</div>
				<Input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className='asd'
					placeholder={isTagsMode ? 'Поиск тегов...' : 'Поиск авторов...'}
				/>
				<div className={styles['tags-container']}>
					{isTagsMode &&
						filteredTags.map((tag) => (
							<button
								className={cn(styles['tag'], {
									[styles['selected']]: selectedTagsId.includes(tag.id)
								})}
								key={tag.id}
								onClick={() => handleTagClick(tag.id)}
							>
								{tag.name}
							</button>
						))}

					{isAuthorsMode &&
						filteredAuthors.map((author) => (
							<button
								className={cn(styles['tag'], {
									[styles['selected']]: selectedAuthorsId.includes(author.id)
								})}
								key={author.id}
								onClick={() => handleAuthorClick(author.id)}
							>
								{`${author.first_name} ${author.last_name} ${author.middle_name}`}
							</button>
						))}
				</div>
				<div className={styles['modal-buttons']}>
					<Button className='green' onClick={handleApply}>
						Применить
					</Button>
					<Button className='red' onClick={handleReset}>
						Сбросить
					</Button>
				</div>
			</div>
		</div>,
		document.body
	);
};

export default Filter;
