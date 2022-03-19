import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CreatePost, Home, NotFound } from './pages';

export const App = () => {
	return (
		<div>
			<Router>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/post/create' element={<CreatePost />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Router>
		</div>
	);
};
