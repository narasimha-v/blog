import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { API_BASE_URL } from '../constants';
import { AuthContext } from '../helpers';
import { Comment } from '../types';

export const Comments: React.FC<{ id?: string }> = ({ id }) => {
	const {
		authorization: { isAuthorized, user }
	} = useContext(AuthContext);
	const [comments, setComments] = useState<Comment[]>([]);
	const [newComment, setNewComment] = useState<string>('');

	useEffect(() => {
		axios
			.get<{ comments: Comment[] }>(`${API_BASE_URL}/comments/${id}`)
			.then((res) => {
				setComments(res.data.comments);
				console.log(res.data);
			});
	}, [id]);

	const addComment = async () => {
		if (!isAuthorized || !user) return;
		let accessToken = localStorage.getItem('accessToken');
		if (!accessToken) return;
		const res = await axios.post<{ comment: Comment }>(
			`${API_BASE_URL}/comments`,
			{
				userId: user.id,
				postId: id,
				comment: newComment
			},
			{ headers: { accessToken } }
		);

		setComments([...comments, res.data.comment]);
		setNewComment('');
	};

	const deleteComment = async (comment: Comment) => {
		let accessToken = localStorage.getItem('accessToken');
		if (!accessToken) return;
		try {
			await axios.delete(`${API_BASE_URL}/comments`, {
				headers: { accessToken },
				params: { id: comment.id, userId: comment.userId }
			});
			setComments(comments.filter((c) => c.id !== comment.id));
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			{isAuthorized ? (
				<div className='center_vertical spacer_vertical'>
					<textarea
						className='create_comment'
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
						placeholder='Comment'
						rows={4}
					/>
					<div>
						<button
							className='btn btn_primary'
							onClick={addComment}
							disabled={!newComment}>
							Comment
						</button>
					</div>
				</div>
			) : (
				<h3>Login to comment</h3>
			)}
			{!!comments.length && (
				<div className='spacer_vertical_small'>
					<h3>Comments</h3>
					{comments.map((c) => (
						<div className='comment_container space_between' key={c.id}>
							<div className='spacer_vertical_small'>
								<div className='comment_username'>{c.user.username}</div>
								<div className='comment'>{c.comment}</div>
							</div>
							{c.userId === user?.id && (
								<i
									onClick={() => deleteComment(c)}
									className='fa fa-trash-o trash'></i>
							)}
						</div>
					))}
				</div>
			)}
		</>
	);
};
