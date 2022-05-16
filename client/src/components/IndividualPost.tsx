import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../constants';
import { Post as IPost } from '../types';
import { capitalize, getFormattedDate } from '../utils';

export const IndividualPost: React.FC<{ id?: string }> = ({ id }) => {
	const navigate = useNavigate();
	const [post, setPost] = useState<IPost>();

	useEffect(() => {
		axios
			.get<{ post: IPost }>(`${API_BASE_URL}/posts/${id}`)
			.then((res) => setPost(res.data.post))
			.catch(() => navigate('/'));
	}, [id, navigate]);

	if (!post) {
		return (
			<div className='center_horizontal card_center'>
				<div className='loader' />
			</div>
		);
	}

	return (
		<div>
			<h3>
				<div>{capitalize(post.user.username)}</div>
				{getFormattedDate(post.createdAt)}
			</h3>
			<h1>{post.title}</h1>
			<pre className='post_description'>{post.description}</pre>
		</div>
	);
};
