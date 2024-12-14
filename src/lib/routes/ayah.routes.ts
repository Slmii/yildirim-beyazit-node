import { withAuth } from '@/lib/middlewares/auth.middleware';
import prisma from '@/lib/prisma';
import { Language, AddAyah } from '@/lib/types/Ayah.types';
import express, { Request, Response } from 'express';

const ayahRoutes = express.Router();

ayahRoutes.get('/', async (_req: Request, res: Response) => {
	const ayahs = await prisma.ayah.findMany({
		distinct: ['surah']
	});

	res.status(200).json(ayahs);
});

ayahRoutes.post('/', withAuth, async (req: Request<any, any, AddAyah[]>, res: Response) => {
	const createManyData: (AddAyah & { language: Language })[] = [];

	for (const { ayah, surah } of req.body) {
		for (const language of Object.values(Language)) {
			createManyData.push({ ayah, surah, language });
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
