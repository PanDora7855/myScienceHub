import { useEffect, useState } from 'react';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import { jsonApiInstance } from '../../../shared/api/api-instance';
import styles from './SearchAuthors.module.scss';
import { IAuthor } from '../../../components/Author/Author.props';
import Author from '../../../components/Author/Author';

//TODO тут надо сделать пагинацию и прикрутить react-query

const SearchAuthors = () => {
	const [authors, setAuthors] = useState<IAuthor[]>([]);

	async function getAuthors() {
		await jsonApiInstance
			.post('/get-authors-paginator', {
				count: 2,
				first_id: 0,
				stroke: ''
			})
			.then((res) => res.data)
			.then((res) => setAuthors(res));
	}

	useEffect(() => {
		getAuthors();
	}, []);

	return (
		<div className={styles['search-authors']}>
			<div className={styles['serach-bar']}>
				<Input className='fullsize' placeholder='Поиск по ID или ФИО' />
				<Button className='green'>Поиск</Button>
			</div>
			<div className={styles['authors']}>
				{authors.map((author, index) => (
					<Author key={index} props={author} />
				))}
			</div>
		</div>
	);
};
export default SearchAuthors;
