import { withAuth } from '@/lib/middlewares/auth.middleware';
import prisma from '@/lib/prisma';
import { AddAyah, AyahLanguage } from '@/lib/types/Ayah.types';
import express, { Request, Response } from 'express';

const ayahRoutes = express.Router();

ayahRoutes.get('/', async (_req: Request, res: Response) => {
	const ayahs = await prisma.ayah.findMany();

	res.status(200).json(ayahs);
});

ayahRoutes.get('/admin', withAuth, async (_req: Request, res: Response) => {
	const ayahs = await prisma.ayah.findMany({
		distinct: ['surah'],
		orderBy: {
			createdAt: 'asc'
		}
	});

	res.status(200).json(ayahs);
});

ayahRoutes.post('/', withAuth, async (req: Request<any, any, AddAyah[]>, res: Response) => {
	const createManyData: (AddAyah & { language: AyahLanguage })[] = [];

	for (const { ayah, surah, completeSurah } of req.body) {
		for (const language of Object.values(AyahLanguage)) {
			createManyData.push({ ayah, surah, language, completeSurah });
		}
	}

	// Delete all ayahs before adding new ones
	await prisma.ayah.deleteMany();

	const addedAyahs = await prisma.ayah.createMany({
		data: createManyData
	});

	res.status(200).json(addedAyahs);
});

ayahRoutes.delete('/', withAuth, async (_req: Request, res: Response) => {
	const deletedAyahs = await prisma.ayah.deleteMany();

	res.status(200).json(deletedAyahs);
});

export { ayahRoutes };
