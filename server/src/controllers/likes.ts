import { asyncWrapper } from '../middleware';
import { Request } from 'express';
import { Likes } from '../models';

interface Like {
	postId: number;
	userId: number;
}

export const likePost = asyncWrapper(
	async (req: Request<{}, {}, Like>, res) => {
		const { userId, postId } = req.body;
		const liked = await Likes.findOne({ where: { postId, userId } });
		if (liked) {
			await Likes.destroy({ where: { postId, userId } });
		} else {
			await Likes.create({ postId, userId });
		}
		return res.json({ success: true });
	}
);
