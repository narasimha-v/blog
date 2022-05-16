import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers';
import { capitalize } from '../utils';

export const Header = () => {
	const navigate = useNavigate();
	const {
		authorization: { isAuthorized, user },
		setAuthorization
	} = useContext(AuthContext);

	const logout = () => {
		setAuthorization({ isAuthorized: false, user: undefined });
		localStorage.removeItem('accessToken');
		localStorage.removeItem('authorization');
		navigate('/');
	};

	return (
		<div className='header'>
			<div className='header-content'>
				<div>
					{user && (
						<div className='navbar_username'>
							Welcome {capitalize(user.username)}
						</div>
					)}
				</div>
				<div className='spacer_horizontal'>
					<Link to='/' className='btn_small btn_primary'>
						Home
					</Link>
					{!isAuthorized && (
						<>
							<Link to='/register' className='btn_small btn_primary'>
								Register
							</Link>
							<Link to='/login' className='btn_small btn_primary'>
								Login
							</Link>
						</>
					)}
					{isAuthorized && (
						<>
							<Link to='/post/create' className='btn_small btn_primary'>
								Create a post
							</Link>
							<button onClick={logout} className='btn_small btn_primary'>
								Logout
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
