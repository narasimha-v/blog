import { Request } from 'express';
import bcrypt from 'bcrypt';
import { asyncWrapper, createCustomError } from '../middleware';
import { Users } from '../models';

interface User {
	username: string;
	password: string;
}

export const registerUser = asyncWrapper(
	async (req: Request<{}, {}, User>, res) => {
		let { username, password } = req.body;
		password = await bcrypt.hash(password, 10);
		await Users.create({ username, password });
		return res.status(201).json({ success: true });
	}
);

export const loginUser = asyncWrapper(
	async (req: Request<{}, {}, User>, res, next) => {
		let { username, password } = req.body;
		const user = await Users.findOne({ where: { username } });
		if (!user) {
			return next(createCustomError('Please check your credentials!', 404));
		}
		let match = await bcrypt.compare(password, user.password);
		if (!match) {
			return next(createCustomError('Please check your credentials!', 404));
		}
		return res.status(201).json({ success: true });
	}
);
