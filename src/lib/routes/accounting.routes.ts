import { withAuth } from '@/lib/middlewares/auth.middleware';
import prisma from '@/lib/prisma';
import express, { Request, Response } from 'express';
import { CategoryType, Prisma } from '@prisma/client';
import { AddAccountingCategory, EditAccountingCategory } from '@/lib/types/Accounting.types';

const accountingRoutes = express.Router();

accountingRoutes.get('/', withAuth, async (_req: Request, res: Response) => {
	const [incomes, expenses] = await Promise.all([
		prisma.category.findMany({ where: { type: CategoryType.INCOME }, orderBy: { createdAt: 'asc' } }),
		prisma.category.findMany({ where: { type: CategoryType.EXPENSE }, orderBy: { createdAt: 'asc' } })
	]);

	const totalIncomes = incomes.reduce((acc, curr) => acc + curr.total.toNumber(), 0);
	const totalExpenses = expenses.reduce((acc, curr) => acc + curr.total.toNumber(), 0);

	res.status(200).json({
		incomes: incomes.map(income => ({ ...income, total: income.total.toNumber() })),
		totalIncomes,
		expenses: expenses.map(expense => ({ ...expense, total: expense.total.toNumber() })),
		totalExpenses
	});
});

accountingRoutes.post('/', withAuth, async (req: Request<any, any, AddAccountingCategory>, res: Response) => {
	const addedAccountCategory = await prisma.category.create({
		data: {
			name: req.body.name,
			type: req.body.type,
			total: new Prisma.Decimal(0)
		}
	});

	res.status(200).json(addedAccountCategory);
});

accountingRoutes.put(
	'/:id',
	withAuth,
	async (req: Request<{ id: string }, any, EditAccountingCategory>, res: Response) => {
		const editedCategory = await prisma.category.update({
			where: { id: Number(req.params.id) },
			data: { name: req.body.name }
		});

		res.status(200).json(editedCategory);
	}
);

export { accountingRoutes };
