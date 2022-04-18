import { Request } from 'express';
import { asyncWrapper, createCustomError } from '../middleware';
import { Posts, Users } from '../models';

interface Post {
	userId: number;
	title: string;
	description: string;
}

export const getPosts = asyncWrapper(async (_, res) => {
	const posts = await Posts.findAll({ include: Users });
	return res.status(200).json({ posts });
});

export const getPost = asyncWrapper(async (req, res, next) => {
	const pId = req.params.id;
	const post = await Posts.findByPk(pId, { include: Users });
	if (!post) {
		return next(createCustomError(`Post with id ${pId} not found!`, 404));
	}
	return res.status(200).json({ post });
});

export const createPost = asyncWrapper(
	async (req: Request<{}, {}, Post>, res) => {
		const post = await Posts.create(req.body, { include: Users });
		return res.status(201).json({ post });
	}
);
