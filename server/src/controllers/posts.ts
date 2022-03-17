import { Request } from 'express';
import { asyncWrapper } from '../middleware';
import { Posts } from '../models';

interface Post {
	name: string;
	description: string;
	username: string;
}

export const getPosts = asyncWrapper(async (_, res) => {
	const posts = await Posts.findAll();
	return res.status(200).json({ posts });
});

export const createPost = asyncWrapper(
	async (req: Request<{}, {}, Post>, res) => {
		const post = await Posts.create(req.body);
		return res.status(201).json({ post });
	}
);
