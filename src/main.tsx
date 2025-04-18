import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import AuthLayout from './layout/Auth/AuthLayout.tsx';
import MainLayout from './layout/Main/MainLayout.tsx';
import Login from './pages/Login/Login.tsx';
import Register from './pages/Register/Register.tsx';
import { store } from './store/store';
import SettingsAbout from './pages/Settings/SettingsAbout/SettingsAbout.tsx';
import SettingsSecurity from './pages/Settings/SettingsSecurity/SettingsSecurity.tsx';

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
		element: <MainLayout />,
		children: [
			{
				path: 'profile',
				element: <SettingsAbout info={profileInfo} />
			},
			{
				path: 'security',
				element: <SettingsSecurity />
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
