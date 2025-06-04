import { FormEvent, useState } from 'react';
import Input from '../../../../components/Input/Input';
import styles from './CreatePublication.module.scss';
import Button from '../../../../components/Button/Button';
import Filter from '../../../../components/Filter/Filter';
import { useTags } from '../../../search/useTags';
import { useAuthors } from '../../../search/useAuthors';
import { useNavigate } from 'react-router';
// import { articleApi } from '../../api';
// import { useQueryClient } from '@tanstack/react-query';
// import { useProfile } from '../../../profile/useProfile';
// import { profileApi } from '../../../profile/api';
import { useCreatePublication } from '../../useCRUDPublication';

interface PublicationInput {
	title: string;
	abstract: string;
	created_at: string;
	file: File | null;
	tags: number[];
	coauthors: number[];
}

const CreatePublication = () => {
	const navigate = useNavigate();
	// const queryClient = useQueryClient();
	const { data: allTags } = useTags();
	const { authors } = useAuthors();
	// const { data: userData } = useProfile();
	const { createPublication } = useCreatePublication();

	const [selectedTagsId, setSelectedTagsId] = useState<number[]>([]);
	const [selectedCoauthorsId, setSelectedCoauthorsId] = useState<number[]>([]);
	const [showTagModal, setShowTagModal] = useState<boolean>(false);
	const [showCoauthorsModal, setShowCoauthorsModal] = useState<boolean>(false);
	const [errors, setErrors] = useState<number>(0);

	const [input, setInput] = useState<PublicationInput>({
		title: '',
		abstract: '',
		created_at: '',
		file: null,
		tags: [],
		coauthors: []
	});

	const handleNavigate = () => {
		navigate(-1);
	};

	const checkFields = () => {
		if (input.title === '' || input.file === null || input.tags.length === 0 || input.created_at === '') {
			setErrors(1);
			return false;
		} else {
			setErrors(0);
			return true;
		}
	};

	const handleApplyTags = (tags: number[]) => {
		setInput({ ...input, tags: tags });
		setSelectedTagsId(tags);
		setShowTagModal(false);
	};

	const handleApplyCoauthors = (coauthors: number[]) => {
		setInput({ ...input, coauthors: coauthors });
		setSelectedCoauthorsId(coauthors);
		setShowCoauthorsModal(false);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (checkFields()) {
			const asd = new Date(input.created_at).toISOString().split('T')[0].split('-');
			const newDate = asd[2] + '-' + asd[1] + '-' + asd[0];
			const formData = new FormData();
			formData.append('title', input.title);
			formData.append('abstract', input.abstract);
			formData.append('file', input.file as File);
			formData.append('created_at', newDate);

			selectedTagsId.forEach((id) => formData.append('tags[]', id.toString()));
			selectedCoauthorsId.forEach((id) => formData.append('coauthors[]', id.toString()));

			createPublication(formData);
			navigate(-1);
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		setInput({ ...input, file });
	};

	const removeTag = (tagId: number) => {
		setInput({ ...input, tags: input.tags.filter((id) => id !== tagId) });
		setSelectedTagsId((prev) => prev.filter((id) => id !== tagId));
	};

	const removeCoauthor = (authorId: number) => {
		setInput({ ...input, tags: input.coauthors.filter((id) => id !== authorId) });
		setSelectedCoauthorsId((prev) => prev.filter((id) => id !== authorId));
	};

	// Получаем выбранные теги и авторов для отображения
	const selectedTags = allTags?.filter((tag) => selectedTagsId.includes(tag.id)) || [];
	const selectedCoauthors = authors?.filter((author) => selectedCoauthorsId.includes(author.id)) || [];

	return (
		<>
			{errors === 1 && <div className={styles['error-message']}>Заполните пожалуйста все поля</div>}
			{showTagModal && (
				<Filter
					tags={allTags}
					onClick={() => setShowTagModal(false)}
					onApplyTags={handleApplyTags}
					selectedIds={selectedTagsId}
				/>
			)}
			{showCoauthorsModal && (
				<Filter
					authors={authors}
					onClick={() => setShowCoauthorsModal(false)}
					onApplyTags={handleApplyCoauthors}
					selectedIds={selectedCoauthorsId}
				/>
			)}
			<h2>Создать новую публикацию</h2>
			<form className={styles['editable-fields']} onSubmit={handleSubmit}>
				<div className={styles['edit-field']}>
					<p>
						Название статьи <span className={styles['star']}>*</span>
					</p>
					<Input
						className='darker'
						name='title'
						value={input.title}
						onChange={(e) => setInput({ ...input, title: e.target.value })}
						placeholder='Название статьи'
					/>
				</div>

				<div className={styles['edit-field']}>
					<p>
						Краткое описание <span className={styles['not-required']}>- Необязательно</span>
					</p>
					<div className={styles['textarea']}>
						<textarea
							name='abstract'
							value={input.abstract}
							onChange={(e) => setInput({ ...input, abstract: e.target.value })}
							placeholder='Описание статьи'
							maxLength={1000}
						/>
						<p>{input.abstract.length}/1000</p>
					</div>
				</div>
				<div className={styles['edit-field']}>
					<p>
						Дата издания <span className={styles['star']}>*</span>
					</p>
					<Input
						name='abstract'
						className='darker'
						value={input.created_at}
						onChange={(e) => setInput({ ...input, created_at: e.target.value })}
						type='date'
						max={new Date().toISOString().split('T')[0]}
					/>
				</div>

				<div className={styles['edit-field']}>
					<p>
						Файл статьи (PDF) <span className={styles['star']}>*</span>
					</p>
					<Input className='darker' name='file' type='file' accept='.pdf' onChange={handleFileChange} />
					{input.file && <p className={styles['file-info']}>Выбран файл: {input.file.name}</p>}
				</div>

				<div className={styles['edit-field']}>
					<p>
						Соавторы <span className={styles['not-required']}>- Необязательно</span>
					</p>

					<Button type='button' className='blue' onClick={() => setShowCoauthorsModal(true)}>
						{selectedCoauthors.length > 0
							? `Изменить соавторов (${selectedCoauthors.length})`
							: '+ Добавить Соавтора'}
					</Button>

					{selectedCoauthors.length > 0 && (
						<div className={styles['tags-container']}>
							{selectedCoauthors.map((author) => (
								<div key={author.id} className={styles['tag']}>
									<p>{`${author.last_name} ${author.first_name} ${author.middle_name}`}</p>
									<button
										type='button'
										onClick={() => removeCoauthor(author.id)}
										className={styles['remove-tag']}
									>
										<img src='/burger/close.svg' width={10} height={10} alt='Удалить' />
									</button>
								</div>
							))}
						</div>
					)}
				</div>

				<div className={styles['edit-field']}>
					<p>
						Теги <span className={styles['star']}>*</span>{' '}
						<span className={styles['not-required']}>Минимум 1 тег</span>
					</p>

					<Button type='button' className='blue' onClick={() => setShowTagModal(true)}>
						{selectedTags.length > 0 ? `Изменить теги (${selectedTags.length})` : '+ Добавить тег'}
					</Button>

					{selectedTags.length > 0 && (
						<div className={styles['tags-container']}>
							{selectedTags.map((tag) => (
								<div key={tag.id} className={styles['tag']}>
									<p>{tag.name}</p>
									<button
										type='button'
										onClick={() => removeTag(tag.id)}
										className={styles['remove-tag']}
									>
										<img src='/burger/close.svg' width={10} height={10} alt='Удалить' />
									</button>
								</div>
							))}
						</div>
					)}
				</div>

				<div className={styles['buttons']}>
					<Button className='green' type='submit'>
						Опубликовать
					</Button>
					<Button className='red' type='button' onClick={handleNavigate}>
						Отменить
					</Button>
				</div>
			</form>
		</>
	);
};

export default CreatePublication;
