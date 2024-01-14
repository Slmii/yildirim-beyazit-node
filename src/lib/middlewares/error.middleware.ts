import { Response, Request, NextFunction } from 'express';

export const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
	console.log('Error Handler', error);

	res.status(res.statusCode).json({
		status: res.status,
		message: error.message,
		name: error.name
	});
};
