import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { API_BASE_URL } from '../constants';
import { AuthContext } from '../helpers';
import { Post } from '../types';
import { capitalize, getFormattedDate } from '../utils';

export const Home = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const {
		authorization: { isAuthorized, user }
	} = useContext(AuthContext);

	useEffect(() => {
		axios.get<{ posts: Post[] }>(`${API_BASE_URL}/posts`).then((res) => {
			setPosts(res.data.posts);
		});
	}, []);

	const toggleLikePost = async (postId: number) => {
		let accessToken = localStorage.getItem('accessToken');
		if (!isAuthorized || !user || !accessToken) {
			return swal({
				title: 'Login to like/unlike posts',
				icon: 'error',
				dangerMode: true
			});
		}
		await axios.post(
			`${API_BASE_URL}/likes`,
			{ userId: user.id, postId },
			{ headers: { accessToken } }
		);
		const {
			data: { post }
		} = await axios.get<{ post: Post }>(`${API_BASE_URL}/posts/${postId}`);
		const idx = posts.findIndex((p) => p.id === post.id);
		let updatedPosts = posts;
		updatedPosts[idx] = post;
		setPosts([...updatedPosts]);
	};

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

							<div className='card_btn_container space_between'>
								<div>
									<Link className='btn btn_primary' to={`/post/${p.id}`}>
										Read More
									</Link>
								</div>
								<div className='center_horizontal spacer_horizontal_small'>
									<div className='like_count'>{p.likes.length}</div>
									<i
										className={`like fa ${
											!!p.likes.find((l) => l.userId === user?.id)
												? 'fa-heart'
												: 'fa-heart-o'
										}`}
										onClick={() => toggleLikePost(p.id)}
									/>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
