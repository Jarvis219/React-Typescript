import { Route, useHistory } from 'react-router-dom';
import { Header } from 'features/client/components/Header/Header';
import { Fragment, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Footer } from 'features/client/components/Footer/Footer';
import { logout } from 'utils/utils';
const PublicRoute = ({ ...rest }) => {
	const history = useHistory();
	useEffect(() => {
		const checkExpired = () => {
			setTimeout(() => {
				const exTime = Number(sessionStorage.getItem('exTime'));
				if (exTime) {
					if (exTime < 0) {
						logout();
						console.log(1);
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
			}, 700);
		};
		checkExpired();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rest]);
	return (
		<Fragment>
			<Header />
			<main className='mt-24'>
				<Route {...rest} />
			</main>
			<Footer />
			<ToastContainer />
		</Fragment>
	);
};

export default PublicRoute;
