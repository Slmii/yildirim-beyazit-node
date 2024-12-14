import { withAuth } from 'src/lib/middlewares/auth.middleware';
import { validateSchema } from 'src/lib/middlewares/validate.middleware';
import prisma from 'src/lib/prisma';
import { memberSchema } from 'src/lib/schemas/member.schema';
import { email } from 'src/lib/services/email.service';
import { AddMember, EditMember, Member, SearchMembersParams } from 'src/lib/types/Member.types';
import { Prisma } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';

const memberRoutes = express.Router();

memberRoutes.post(
	'/email',
	validateSchema(memberSchema),
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

memberRoutes.post('/', withAuth, async (req: Request<any, any, AddMember[]>, res: Response, _next: NextFunction) => {
	const members = await prisma.member.createManyAndReturn({
		data: req.body.map(member => ({
			name: member.name,
			address: member.address,
			zip: member.zip,
			city: member.city,
			email: member.email,
			phone: member.phone,
			bank: member.bank,
			amount: member.amount
		}))
	});

	res.status(200).json(members);
});

memberRoutes.put(
	'/:id',
	withAuth,
	async (req: Request<{ id: string }, any, EditMember>, res: Response, _next: NextFunction) => {
		const member = await prisma.member.update({
			where: { id: Number(req.params.id) },
			data: {
				name: req.body.name,
				address: req.body.address,
				zip: req.body.zip,
				city: req.body.city,
				email: req.body.email,
				phone: req.body.phone,
				bank: req.body.bank,
				amount: req.body.amount
			}
		});

		res.status(200).json(member);
	}
);

memberRoutes.get('/:id', withAuth, async (req: Request<{ id: string }>, res: Response) => {
	const member = await prisma.member.findUnique({
		where: {
			id: Number(req.params.id)
		}
	});

	if (!member) {
		return res.status(404).json({ message: 'Member not found' });
	}

	res.status(200).json({
		...member,
		amount: member.amount.toNumber()
	});
});

memberRoutes.get('/', withAuth, async (req: Request<any, any, any, SearchMembersParams>, res: Response) => {
	const searchParams = req.query;

	const whereQuery: Prisma.MemberWhereInput | undefined = searchParams.query
		? {
				OR: [
					{
						name: {
							contains: searchParams.query,
							mode: 'insensitive'
						}
					},
					{
						email: {
							contains: searchParams.query,
							mode: 'insensitive'
						}
					},
					{
						phone: {
							contains: searchParams.query,
							mode: 'insensitive'
						}
					},
					{
						address: {
							contains: searchParams.query,
							mode: 'insensitive'
						}
					},
					{
						zip: {
							contains: searchParams.query,
							mode: 'insensitive'
						}
					},
					{
						city: {
							contains: searchParams.query,
							mode: 'insensitive'
						}
					},
					{
						phone: {
							contains: searchParams.query,
							mode: 'insensitive'
						}
					},
					{
						bank: {
							contains: searchParams.query,
							mode: 'insensitive'
						}
					}
				]
		  }
		: undefined;

	const [members, count] = await Promise.all([
		prisma.member.findMany({
			orderBy: searchParams.orderBy ? { [searchParams.orderBy]: searchParams.order } : undefined,
			take: searchParams.take ? Number(searchParams.take) : undefined,
			skip: searchParams.page ? (Number(searchParams.page) - 1) * Number(searchParams.take ?? 0) : undefined,
			where: whereQuery
		}),
		prisma.member.count({
			where: whereQuery
		})
	]);

	res.status(200).json({
		members: members.map(member => ({
			...member,
			amount: member.amount.toNumber()
		})),
		count
	});
});

memberRoutes.delete('/', withAuth, async (req: Request<any, any, number[]>, res: Response) => {
	console.log(req.body);
	const deletedMembers = await prisma.member.deleteMany({
		where: {
			id: {
				in: req.body
			}
		}
	});

	res.status(200).json(deletedMembers);
});

export { memberRoutes };
