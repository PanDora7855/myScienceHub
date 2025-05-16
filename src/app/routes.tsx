import SettingsAbout from '../pages/Settings/SettingsAbout/SettingsAbout';
import SettingsSecurity from '../pages/Settings/SettingsSecurity/SettingsSecurity';
import SearchAuthors from '../pages/Search/SearchAuthors/SearchAuthors';
import SearchPublications from '../pages/Search/SearchPublications/SearchPublications';
import ProfileOverview from '../pages/Profile/ProfileOverview/ProfileOverview';
import ProfilePublications from '../pages/Profile/ProfilePublications/ProfilePublications';
import { createBrowserRouter, Navigate } from 'react-router';
import AuthLayout from '../layout/Auth/AuthLayout';
import MainLayout from '../layout/Main/MainLayout';
import Login from '../features/auth/components/Login/Login';
import Register from '../pages/Register/Register';
// import RequireAuth from '../helpers/RequireAuth';

const profileInfo = [
	{ title: 'Фамилия', value: 'Иванов' },
	{ title: 'Имя', value: 'Иван' },
	{ title: 'Отчество', value: 'Иванович' },
	{ title: 'Статус', value: 'Иванович' },
	{ title: 'Должность', value: 'Иванович' },
	{ title: 'Страна', value: 'Иванович' },
	{ title: 'Кафедра', value: 'Иванович' },
	{ title: 'Ученое звание', value: 'Иванович' },
	{ title: 'Учёная степень', value: 'Иванович' }
];

export const router = createBrowserRouter([
	{
		path: '/',
		element: (
			// <RequireAuth>
			<MainLayout />
			// </RequireAuth>
		),
		children: [
			{
				index: true,
				element: <Navigate to='/search/articles' replace />
			},
			{
				path: 'settings',
				handle: {
					title: 'Настройки',
					tabs: [
						{ label: 'О себе', linkTo: 'profile' },
						{ label: 'Безопасность', linkTo: 'security' }
					]
				},
				children: [
					{
						path: 'profile',
						element: <SettingsAbout info={profileInfo} />,
						handle: {
							secondTitle: 'О себе'
						}
					},
					{
						path: 'security',
						element: <SettingsSecurity />,
						handle: {
							secondTitle: 'Безопасность'
						}
					}
				]
			},
			{
				path: 'search',
				handle: {
					title: 'Поиск',
					tabs: [
						{ label: 'Статьи', linkTo: 'articles' },
						{ label: 'Авторы', linkTo: 'authors' }
					]
				},
				children: [
					{
						path: 'authors',
						element: <SearchAuthors />,
						handle: {
							secondTitle: 'Авторы'
						}
					},
					{
						path: 'articles',
						element: <SearchPublications />,
						handle: {
							secondTitle: 'Статьи'
						}
					}
				]
			},
			{
				path: 'profile',
				handle: {
					title: 'Профиль',
					tabs: [
						{ label: 'Обзор', linkTo: 'overview' },
						{ label: 'Публикации', linkTo: 'publications' }
					]
				},
				children: [
					{
						path: ':authorId/overview',
						element: <ProfileOverview />,
						handle: {
							secondTitle: 'Обзор'
						}
					},
					{
						path: ':authorId/publications',
						element: <ProfilePublications />,
						handle: {
							secondTitle: 'Публикации'
						}
					}
				]
			}
		]
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login />
			},
			{
				path: 'register',
				element: <Register />
			}
		]
	}
]);
