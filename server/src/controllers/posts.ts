import { Request } from 'express';
import { asyncWrapper, createCustomError } from '../middleware';
import { Likes, Posts, Users } from '../models';

interface Post {
	userId: number;
	title: string;
	description: string;
}

export const getPosts = asyncWrapper(async (_, res) => {
	const posts = await Posts.findAll({ include: [Users, Likes] });
	return res.status(200).json({ posts });
});

export const getPost = asyncWrapper(async (req, res, next) => {
	const pId = req.params.id;
	const post = await Posts.findByPk(pId, { include: [Users, Likes] });
	if (!post) {
		return next(createCustomError(`Post with id ${pId} not found!`, 404));
	}
	return res.status(200).json({ post });
});

export const createPost = asyncWrapper(
	async (req: Request<{}, {}, Post>, res) => {
		let post = await Posts.create(req.body);
		post = (await Posts.findByPk(post.id, {
			include: Users
		})) as Posts;
		return res.status(201).json({ post });
	}
);
