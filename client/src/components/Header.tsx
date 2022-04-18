import { Link } from 'react-router-dom';

export const Header = () => {
	return (
		<div className='header'>
			<div className='header-content'>
				<div />
				<div className='spacer_horizontal'>
					<Link to='/register' className='btn_small btn_primary'>
						Register
					</Link>
					<Link to='/login' className='btn_small btn_primary'>
						Login
					</Link>
					<Link to='/' className='btn_small btn_primary'>
						Home
					</Link>
					<Link to='/post/create' className='btn_small btn_primary'>
						Create a post
					</Link>
				</div>
			</div>
		</div>
	);
};
