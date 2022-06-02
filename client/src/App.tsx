import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components';
import { AuthContext, Authorization } from './helpers';
import {
	CreatePost,
	Home,
	Login,
	NotFound,
	Post,
	Profile,
	Registration
} from './pages';

export const App = () => {
	const authSaved = JSON.parse(localStorage.getItem('authorization') ?? '{}');
	const [authorization, setAuthorization] = useState<Authorization>(
		authSaved ?? {
			isAuthorized: false
		}
	);

	return (
		<div>
			<AuthContext.Provider value={{ authorization, setAuthorization }}>
				<Router>
					<Header />
					<div className='content'>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/profile/:id' element={<Profile />} />
							<Route path='/post/create' element={<CreatePost />} />
							<Route path='/post/:id' element={<Post />} />
							<Route path='/register' element={<Registration />} />
							<Route path='/login' element={<Login />} />
							<Route path='*' element={<NotFound />} />
						</Routes>
					</div>
				</Router>
			</AuthContext.Provider>
		</div>
	);
};
