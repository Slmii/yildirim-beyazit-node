import express, { NextFunction, Request, Response } from 'express';
import { validate } from '../middlewares';
import { contactSchema } from '../schemas';
import { Contact } from '../types';
import { email } from '../services';

const contactRoutes = express.Router();

contactRoutes.post(
	'/',
	validate(contactSchema),
	async (req: Request<any, any, Contact>, res: Response, _next: NextFunction) => {
		const input = req.body;

		await email({
			subject: 'Yıldırım Beyazıt Cami Ulaşım Formu',
			html: `
				<h1>Yıldırım Beyazıt Cami Ulaşım Formu</h1>
				<p><b>Isim:</b> ${input.name}</p>
				<p><b>E-posta:</b> ${input.email}</p>
				<p><b>Telefon:</b> ${input.phone}</p>
				<p><b>Mesaj:</b> ${input.message}</p>
			`
		});

		res.status(200).json({ message: 'Success' });
	}
);

export { contactRoutes };
