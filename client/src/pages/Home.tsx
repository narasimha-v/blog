import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../constants';
import { Post } from '../types';
import { capitalize, getFormattedDate } from '../utils';

export const Home = () => {
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		axios.get<{ posts: Post[] }>(`${API_BASE_URL}/posts`).then((res) => {
			setPosts(res.data.posts);
		});
	}, []);

	return (
		<div className='container spacer_vertical'>
			<div className='posts_container center_horizontal'>
				{posts.map((p) => (
					<div key={p.id} className='container'>
						<div className='card'>
							<h4>
								<div>{capitalize(p.user.username)}</div>
								{getFormattedDate(p.createdAt)}
							</h4>
							<h2>{p.title}</h2>
							<p>{p.description.slice(0, 200)}........</p>
							<div className='card_btn_container'>
								<Link className='btn btn_primary' to={`/post/${p.id}`}>
									Read More
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
