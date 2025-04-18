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

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				path: 'profile',
				element: <SettingsAbout />
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
