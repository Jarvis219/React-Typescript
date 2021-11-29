import { Redirect, Route, useHistory } from 'react-router-dom';
import { Header } from '../features/admin/components/Header/Header';
import SideBar from 'features/admin/components/SideBar/SideBar';
import useAuth from './useAuth';
import { ToastContainer } from 'react-toastify';
import { logout } from 'utils/utils';
import { useEffect } from 'react';

const PrivateRoute = ({ ...rest }) => {
	const auth = useAuth();
	const history = useHistory();
	const checkExpired = () => {
		const exTime = Number(sessionStorage.getItem('exTime'));
		if (exTime) {
			if (exTime < 0) {
				logout();
				history.push('/login');
				return;
			}
			JSON.stringify(
				sessionStorage.setItem(
					'exTime',
					sessionStorage.getItem('expiresIn')!.slice(0, -1)
				)
			);
		}
	};
	useEffect(() => {
		checkExpired();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rest]);
	if (auth === null || auth === 0) return <Redirect to='/login' />;
	return (
		<div className='mx-auto bg-grey-400 font-serif'>
			<div className='min-h-screen flex flex-col'>
				<Header />
				<div className='flex flex-1'>
					<SideBar />
					<main className='bg-white-500 flex-1  p-3 overflow-hidden '>
						<Route {...rest} />
					</main>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default PrivateRoute;
