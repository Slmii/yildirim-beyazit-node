import express, { NextFunction, Request, Response } from 'express';
import { validate } from '../middlewares';
import { memberSchema } from '../schemas';
import { Member } from '../types';
import { email } from '../services';

const memberRoutes = express.Router();

memberRoutes.post(
	'/',
	validate(memberSchema),
	async (req: Request<any, any, Member>, res: Response, _next: NextFunction) => {
		const input = req.body;

		await email({
			subject: 'Yıldırım Beyazıt Cami Üyelik Başvuru Formu',
			html: `
				<h1>Yıldırım Beyazıt Cami Üyelik Başvuru Formu</h1>
				<p><b>Ad ve Soyad:</b> ${input.name}</p>
				<p><b>Doğum Tarihi:</b> ${new Date(input.birthday).toLocaleDateString('nl-NL', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}</p>
				<p><b>Adres:</b> ${input.address}</p>
				<p><b>Posta Kodu:</b> ${input.zip}</p>
				<p><b>Şehir:</b> ${input.city}</p>
				<p><b>E-posta:</b> ${input.email}</p>
				<p><b>Telefon:</b> ${input.phone}</p>
				<p><b>Banka:</b> ${input.bank}</p>
				<p><b>Aidat Miktarı:</b> ${input.amount}</p>
			`
		});

		res.status(200).json({ message: 'Success' });
	}
);

export { memberRoutes };
