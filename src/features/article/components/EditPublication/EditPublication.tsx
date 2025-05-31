import { FormEvent, useEffect, useState } from 'react';
import Input from '../../../../components/Input/Input';
import styles from './EditPublication.module.scss';
import Button from '../../../../components/Button/Button';
import Filter from '../../../../components/Filter/Filter';
import { useTags } from '../../../search/useTags';
import { useAuthors } from '../../../search/useAuthors';
import { useNavigate, useParams } from 'react-router';
import { articleApi } from '../../api';
import { useQuery } from '@tanstack/react-query';
import { useProfile } from '../../../profile/useProfile';
import { ITag } from '../../../../helpers/interfaces';
import { useDeletePublication, useUpdatePublication } from '../../useCRUDPublication';

interface PublicationInput {
	title: string;
	abstract: string;
	file: File | null;
	tags: number[];
	created_at: string;
	coauthors: number[];
	fileLink: string;
}

// TODO Сделать мутации для удаления, редактирования и создания

const EditPublication = () => {
	const navigate = useNavigate();
	const { articleId } = useParams();
	const { data: allTags } = useTags();
	const { authors } = useAuthors();
	const { data: userData } = useProfile();

	const { deletePublication } = useDeletePublication();
	const { updatePublication } = useUpdatePublication();

	// Получаем данные статьи для редактирования
	const { data: articleData, isLoading } = useQuery({
		...articleApi.getArticleById(articleId as string),
		enabled: !!articleId
	});

	const [selectedTagsId, setSelectedTagsId] = useState<number[]>([]);
	const [selectedCoauthorsId, setSelectedCoauthorsId] = useState<number[]>([]);
	const [showTagModal, setShowTagModal] = useState<boolean>(false);
	const [showCoauthorsModal, setShowCoauthorsModal] = useState<boolean>(false);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
	const [errors, setErrors] = useState<number>(0);

	const [input, setInput] = useState<PublicationInput>({
		title: '',
		abstract: '',
		file: null,
		created_at: '',
		tags: [],
		coauthors: [],
		fileLink: ''
	});

	// Заполняем форму данными статьи при загрузке
	useEffect(() => {
		if (articleData) {
			setInput({
				title: articleData.title,
				abstract: articleData.abstract,
				file: null,
				created_at: articleData.created_at.toString().split('T')[0],
				tags: articleData.tags?.map((tag) => tag.id) || [],
				coauthors: articleData.profiles?.map((profile) => profile.id) || [],
				fileLink: articleData.file_link
			});
			setSelectedTagsId(articleData.tags?.map((tag) => tag.id) || []);
			setSelectedCoauthorsId(
				articleData.profiles?.map((profile) => profile.id).filter((id) => id !== userData?.id) || []
			);
		}
	}, [articleData, userData?.id]);

	const checkFields = () => {
		if (input.title === '' || input.tags.length === 0 || input.created_at === '') {
			setErrors(1);
			return false;
		} else {
			setErrors(0);
			return true;
		}
	};

	const handleNavigate = () => {
		navigate(-1);
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

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (checkFields()) {
			const formData = new FormData();

			// Добавляем ID публикации
			formData.append('publication_id', articleId as string);

			// Добавляем остальные поля
			formData.append('title', input.title);
			formData.append('abstract', input.abstract);
			formData.append('owner_id', userData?.id.toString() || '');
			formData.append('fileLink', input.fileLink);
			formData.append('created_at', new Date(input.created_at).toISOString().split('T')[0]);

			if (input.file) {
				formData.append('file', input.file);
			}

			input.coauthors.forEach((id) => {
				formData.append('coauthors[]', id.toString());
			});

			input.tags.forEach((id) => {
				formData.append('tags[]', id.toString());
			});

			try {
				updatePublication(formData);
				navigate(-1);
			} catch (error) {
				console.error('Ошибка при обновлении публикации:', error);
			}
		}
	};

	const handleDelete = () => {
		try {
			deletePublication(parseInt(articleId as string), input.fileLink, userData?.id || 0);
			navigate(-1);
		} catch (error) {
			console.error('Ошибка при удалении публикации:', error);
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
		setInput({ ...input, coauthors: input.coauthors.filter((id) => id !== authorId) });
		setSelectedCoauthorsId((prev) => prev.filter((id) => id !== authorId));
	};

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

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
			{showDeleteConfirm && (
				<div className={styles['delete-modal']}>
					<div className={styles['delete-content']}>
						<h3>Удаление публикации</h3>
						<p>Вы уверены, что хотите удалить эту публикацию? Это действие необратимо.</p>
						<div className={styles['delete-buttons']}>
							<Button className='red' onClick={handleDelete}>
								Удалить
							</Button>
							<Button className='white' onClick={() => setShowDeleteConfirm(false)}>
								Отмена
							</Button>
						</div>
					</div>
				</div>
			)}
			<h2>Редактировать публикацию</h2>
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
						placeholder={articleData?.title}
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
							placeholder={articleData?.abstract}
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
					/>
				</div>

				<div className={styles['edit-field']}>
					<p>
						Текущий файл:{' '}
						<a href={input.fileLink} target='_blank' rel='noopener noreferrer'>
							Скачать
						</a>
					</p>
					<p>
						Новый файл статьи (PDF) <span className={styles['not-required']}>- Необязательно</span>
					</p>
					<Input className='darker' name='file' type='file' accept='.pdf' onChange={handleFileChange} />
					{input.file && <p className={styles['file-info']}>Выбран новый файл: {input.file.name}</p>}
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
						Теги <span className={styles['star']}>*</span>
					</p>

					<Button type='button' className='blue' onClick={() => setShowTagModal(true)}>
						{selectedTags.length > 0 ? `Изменить теги (${selectedTags.length})` : '+ Добавить тег'}
					</Button>

					{selectedTags.length > 0 && (
						<div className={styles['tags-container']}>
							{selectedTags.map((tag: ITag) => (
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
						Сохранить изменения
					</Button>
					<Button className='red' type='button' onClick={() => setShowDeleteConfirm(true)}>
						Удалить статью
					</Button>
					<Button className='white' type='button' onClick={handleNavigate}>
						Отменить
					</Button>
				</div>
			</form>
		</>
	);
};

export default EditPublication;
