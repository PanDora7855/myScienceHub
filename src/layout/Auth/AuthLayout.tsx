import { Outlet } from 'react-router';

//TODO сделать лэйаут для регистрации и авторизации
const AuthLayout = () => {
	return (
		<div>
			<Outlet />
		</div>
	);
};
export default AuthLayout;
