import { Request } from 'express';
import bcrypt from 'bcrypt';
import { asyncWrapper } from '../middleware';
import { Users } from '../models';

interface User {
	username: string;
	password: string;
}

export const createUser = asyncWrapper(
	async (req: Request<{}, {}, User>, res) => {
		let { username, password } = req.body;
		password = await bcrypt.hash(password, 10);
		await Users.create({ username, password });
		return res.status(201).json({ success: true });
	}
);
