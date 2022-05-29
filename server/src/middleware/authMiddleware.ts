import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { IRequest } from './async';
import { createCustomError } from './customError';

export const validateToken = (
	req: IRequest,
	_: Response,
	next: NextFunction
) => {
	const jwt = req.header('accessToken');
	if (!jwt) {
		return next(createCustomError('Not authorized', 404));
	}
	try {
		const validToken = verify(jwt, process.env.JWT_SECRET!);
		req.user = validToken as { username: string; id: number };
		if (validToken) return next();
	} catch (error) {
		return next(createCustomError('Not authorized', 404));
	}
};
