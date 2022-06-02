import { Request } from 'express';
import bcrypt from 'bcrypt';
import { asyncWrapper, createCustomError } from '../middleware';
import { Posts, Users } from '../models';
import { sign } from 'jsonwebtoken';

interface User {
	username: string;
	password: string;
}

export const registerUser = asyncWrapper(
	async (req: Request<{}, {}, User>, res) => {
		let { username, password } = req.body;
		password = await bcrypt.hash(password, 10);
		const user = await Users.create({ username, password });
		const accessToken = sign(
			{ username: user.username, id: user.id },
			process.env.JWT_SECRET!
		);
		return res.status(201).json({ accessToken, user });
	}
);

export const loginUser = asyncWrapper(
	async (req: Request<{}, {}, User>, res, next) => {
		let { username, password } = req.body;
		const user = await Users.scope('full').findOne({ where: { username } });
		if (!user) {
			return next(createCustomError('Please check your credentials!', 404));
		}
		let match = await bcrypt.compare(password, user.password);
		if (!match) {
			return next(createCustomError('Please check your credentials!', 404));
		}
		const accessToken = sign(
			{ username: user.username, id: user.id },
			process.env.JWT_SECRET!
		);
		return res.status(201).json({ accessToken, user });
	}
);

export const userInfo = asyncWrapper(async (req, res, next) => {
	const id = req.params.id;
	const user = await Users.findByPk(id, { include: [Posts] });
	return res.status(200).json({ user });
});
