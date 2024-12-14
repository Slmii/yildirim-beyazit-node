import { IRequest } from 'src/lib/types/Request.types';
import { NextFunction, Response } from 'express';

export const withAuth = async (req: IRequest, res: Response, next: NextFunction) => {
	try {
		const auth = req.auth;

		const userId = auth?.userId;
		if (!userId || userId === null) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		next();
	} catch (error) {
		next(error);
	}
};
