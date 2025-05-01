import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import './index.css';
import AuthLayout from './layout/Auth/AuthLayout.tsx';
import MainLayout from './layout/Main/MainLayout.tsx';
import Login from './pages/Login/Login.tsx';
import Register from './pages/Register/Register.tsx';
import { store } from './store/store';
import SettingsAbout from './pages/Settings/SettingsAbout/SettingsAbout.tsx';
import SettingsSecurity from './pages/Settings/SettingsSecurity/SettingsSecurity.tsx';
import SearchAuthors from './pages/Search/SearchAuthors/SearchAuthors.tsx';
import SearchPublications from './pages/Search/SearchPublications/SearchPublications.tsx';
import ProfileOverview from './pages/Profile/ProfileOverview/ProfileOverview.tsx';
import ProfilePublications from './pages/Profile/ProfilePublications/ProfilePublications.tsx';
import RequireAuth from './helpers/RequireAuth.tsx';

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

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<RequireAuth>
				<MainLayout />
			</RequireAuth>
		),
		children: [
			{
				index: true,
				// TODO В дальнейшем перенести на главный экран или на поиск статей 'search/articles'
				element: <Navigate to='/search/authors' replace />
			},
			{
				path: 'settings',
				handle: {
					title: 'Настройки',
					tabs: [
						{ label: 'О себе', linkTo: 'settings/profile' },
						{ label: 'Безопасность', linkTo: 'settings/security' }
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
						{ label: 'Статьи', linkTo: 'search/articles' },
						{ label: 'Авторы', linkTo: 'search/authors' }
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
						{ label: 'Обзор', linkTo: 'profile/overview' },
						{ label: 'Публикации', linkTo: 'profile/publications' }
					]
				},
				children: [
					{
						path: 'overview',
						element: <ProfileOverview />,
						handle: {
							secondTitle: 'Обзор'
						}
					},
					{
						path: 'publications',
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

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
