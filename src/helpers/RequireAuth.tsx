import { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../features/auth/useAuth';

const RequireAuth = ({ children }: { children: ReactNode }) => {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) return <Navigate to={'/auth/login'} replace />;
	return children;
};
export default RequireAuth;
