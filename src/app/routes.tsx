import SettingsAbout from '../features/profile/components/SettingsAbout/SettingsAbout';
import SettingsSecurity from '../features/profile/components/SettingsSecurity/SettingsSecurity';
import SearchAuthors from '../features/search/components/SearchAuthors/SearchAuthors';
import SearchPublications from '../features/search/components/SearchPublications/SearchPublications';
import ProfileOverview from '../features/profile/components/ProfileOverview/ProfileOverview';
import ProfilePublications from '../features/profile/components/ProfilePublications/ProfilePublications';
import { createBrowserRouter, Navigate } from 'react-router';
import AuthLayout from '../layout/Auth/AuthLayout';
import MainLayout from '../layout/Main/MainLayout';
import Login from '../features/auth/components/Login/Login';
import Register from '../features/auth/components/Register/Register';
// import RequireAuth from '../helpers/RequireAuth';

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
						element: <SettingsAbout />,
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
