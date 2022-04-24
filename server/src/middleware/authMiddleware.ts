import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { createCustomError } from './customError';

export const validateToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const jwt = req.header('accessToken');
	if (!jwt) {
		return next(createCustomError('Not authorized', 404));
	}
	try {
		const validToken = verify(jwt, process.env.JWT_SECRET!);
		if (validToken) return next();
	} catch (error) {
		return next(createCustomError('Not authorized', 404));
	}
};
