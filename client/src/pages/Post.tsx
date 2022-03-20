import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_BASE_URL } from '../constants';
import { Post as IPost } from '../types';
import { getFormattedDate } from '../utils';

export const Post = () => {
	const { id } = useParams();
	const [post, setPost] = useState<IPost>();

	useEffect(() => {
		axios
			.get<{ post: IPost }>(`${API_BASE_URL}/posts/${id}?delay=5000`)
			.then((res) => {
				setPost(res.data.post);
			});
	}, [id]);

	return (
		<div className='container center_vertical spacer_vertical'>
			<div className='card_large'>
				{post ? (
					<div>
						<h3>
							<div>{post.username}</div>
							{getFormattedDate(post.createdAt)}
						</h3>
						<h1>{post.title}</h1>
						<pre className='post_description'>{post.description}</pre>
					</div>
				) : (
					<div className='center_horizontal card_center'>
						<div className='loader' />
					</div>
				)}
			</div>
			<Link className='btn btn_primary' to='/'>
				Back
			</Link>
		</div>
	);
};
