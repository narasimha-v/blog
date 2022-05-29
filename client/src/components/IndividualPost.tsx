import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../constants';
import { AuthContext } from '../helpers';
import { Post as IPost } from '../types';
import { capitalize, getFormattedDate } from '../utils';

export const IndividualPost: React.FC<{ id?: string }> = ({ id }) => {
	const navigate = useNavigate();
	const {
		authorization: { user }
	} = useContext(AuthContext);
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

	const deletePost = async () => {
		let accessToken = localStorage.getItem('accessToken');
		if (!accessToken) return;
		try {
			await axios.delete(`${API_BASE_URL}/posts/${id}`, {
				headers: { accessToken }
			});
		} catch (error) {
			console.error(error);
		} finally {
			navigate('/');
		}
	};

	return (
		<div>
			<div className='space_between'>
				<h3>
					<div>{capitalize(post.user.username)}</div>
					{getFormattedDate(post.createdAt)}
				</h3>
				<div>
					{post.userId === user?.id && (
						<i onClick={deletePost} className='fa fa-trash-o trash'></i>
					)}
				</div>
			</div>
			<h1>{post.title}</h1>
			<pre className='post_description'>{post.description}</pre>
		</div>
	);
};
