import { useMatches } from 'react-router';
import { IRouteHandle } from '../layout/Main/MainLayout.props';

/**
 * Кастомный хук для получения мета-данных страницы из текущего маршрута.
 *
 * Пример использования:
 * ```tsx
 * const { title, secondTitle, tabs } = usePageMeta();
 * ```
 */
export const usePageMeta = () => {
	const matches = useMatches();

	const sectionMatch = matches
		.map((match) => match.handle as IRouteHandle | undefined)
		.find((handle) => handle?.tabs && handle?.title);
	const currentMatch = matches
		.map((match) => match.handle as IRouteHandle | undefined)
		.find((handle) => handle?.secondTitle);

	const title = sectionMatch?.title ?? '';
	const tabs = sectionMatch?.tabs ?? [];
	const secondTitle = currentMatch?.secondTitle ?? tabs[0]?.label ?? '';

	return { title, tabs, secondTitle };
};
