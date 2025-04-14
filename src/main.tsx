import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
// import { createBrowserRouter } from 'react-router';

// const router = createBrowserRouter([
// 	{
// 		path: '/',
// 		element: ()
// 	}
// ]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
