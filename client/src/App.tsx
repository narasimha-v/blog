import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components';
import { CreatePost, Home, Login, NotFound, Post, Registration } from './pages';

export const App = () => {
	return (
		<div>
			<Router>
				<Header />
				<div className='content'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/post/create' element={<CreatePost />} />
						<Route path='/post/:id' element={<Post />} />
						<Route path='/register' element={<Registration />} />
						<Route path='/login' element={<Login />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</div>
			</Router>
		</div>
	);
};
