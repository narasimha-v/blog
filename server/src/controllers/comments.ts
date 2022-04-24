import { Request } from 'express';
import { asyncWrapper, createCustomError } from '../middleware';
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
		let comment = await Comments.create(req.body);
		comment = (await Comments.findByPk(comment.id, {
			include: [Users, Posts]
		})) as Comments;
		return res.status(201).json({ comment });
	}
);

export const deleteComment = asyncWrapper(async (req, res, next) => {
	const id = Number(req.query.id);
	const userId = Number(req.query.userId);
	const comment = await Comments.findOne({ where: { id } });
	if (!comment || comment.userId !== userId) {
		return next(createCustomError('Not authorized!', 404));
	}
	comment.destroy();
	return res.status(201).json({ success: true });
});
