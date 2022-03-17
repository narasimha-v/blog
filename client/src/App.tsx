import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from './constants';
import { Post } from './types';
import { getFormattedDate } from './utils';

export const App: React.FC = () => {
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		axios.get<{ posts: Post[] }>(`${API_BASE_URL}/posts`).then((res) => {
			setPosts(res.data.posts);
		});
	}, []);

	return (
		<div>
			{posts.map((p) => (
				<div key={p.id} className='card'>
					<h4>
						<div>{p.username}</div>
						{getFormattedDate(p.createdAt)}
					</h4>
					<h2>{p.name}</h2>
					<p>{p.description}</p>
					<div className='card_btn_container'>
						<a className='btn_primary' href='/'>
							Read More
						</a>
					</div>
				</div>
			))}
		</div>
	);
};
