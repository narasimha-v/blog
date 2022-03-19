import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../constants';
import { Post } from '../types';
import { getFormattedDate } from '../utils';

export const Home = () => {
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		axios.get<{ posts: Post[] }>(`${API_BASE_URL}/posts`).then((res) => {
			setPosts(res.data.posts);
		});
	}, []);

	return (
		<div className='container spacer_vertical'>
			<div className='center_horizontal'>
				<Link className='btn btn_primary' to='/post/create/'>
					Create a post
				</Link>
			</div>
			<div className='posts_container center_horizontal'>
				{posts.map((p) => (
					<div className='post_container'>
						<div key={p.id} className='card'>
							<h4>
								<div>{p.username}</div>
								{getFormattedDate(p.createdAt)}
							</h4>
							<h2>{p.name}</h2>
							<p>{p.description}</p>
							<div className='card_btn_container'>
								<a className='btn btn_primary' href='/'>
									Read More
								</a>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};