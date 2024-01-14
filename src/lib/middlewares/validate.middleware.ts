import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AnyObjectSchema, ValidationError } from 'yup';

export const validate =
	(schema: AnyObjectSchema): RequestHandler =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.validate({
				body: req.body,
				query: req.query,
				params: req.params
			});

			return next();
		} catch (error) {
			const err = error as ValidationError;
			console.log('Validation Error', err);

			return res.status(400).json({ type: err.name, message: err.message, errors: err.errors });
		}
	};
