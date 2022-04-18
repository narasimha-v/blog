import { Request } from 'express';
import { asyncWrapper } from '../middleware';
import { Comments, Posts, Users } from '../models';

interface Comment {
	postId: number;
	userId: number;
	comment: string;
}

export const getComments = asyncWrapper(async (req, res) => {
	const pId = req.params.postId;
	const comments = await Comments.findAll({
		where: { postId: pId },
		include: [Users, Posts]
	});
	return res.status(200).json({ comments });
});

export const addComment = asyncWrapper(
	async (req: Request<{}, {}, Comment>, res) => {
		const comment = await Comments.create(req.body, {
			include: [Users, Posts]
		});
		return res.status(201).json({ comment });
	}
);
