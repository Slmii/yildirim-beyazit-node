import { Request, Response, NextFunction, RequestHandler } from 'express';
import z, { ZodError } from 'zod';

export const validateSchema =
	(schema: z.ZodObject<any, any>): RequestHandler =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body);
			return next();
		} catch (error) {
			if (error instanceof ZodError) {
				const errorMessages = error.errors.map((issue: any) => ({
					message: `${issue.path.join('.')} is ${issue.message}`
				}));
				res.status(400).json({ message: 'Invalid data', error: errorMessages });
			} else {
				res.status(500).json({ message: 'Internal Server Error' });
			}
		}
	};
