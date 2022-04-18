import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../constants';
import { Comment } from '../types';

export const Comments: React.FC<{ id?: string }> = ({ id }) => {
	const [comments, setComments] = useState<Comment[]>([]);
	const [newComment, setNewComment] = useState<string>('');

	useEffect(() => {
		axios
			.get<{ comments: Comment[] }>(`${API_BASE_URL}/comments/${id}`)
			.then((res) => {
				setComments(res.data.comments);
			});
	}, [id]);

	const addComment = async () => {
		const res = await axios.post<{ comment: Comment }>(
			`${API_BASE_URL}/comments`,
			{
				userId: 1,
				postId: id,
				comment: newComment
			}
		);
		setComments([...comments, res.data.comment]);
		setNewComment('');
	};

	return (
		<>
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
			{!!comments.length && (
				<div className='spacer_vertical_small'>
					<h3>Comments</h3>
					{comments.map((c) => (
						<div className='comment' key={c.id}>
							{c.comment}
						</div>
					))}
				</div>
			)}
		</>
	);
};
