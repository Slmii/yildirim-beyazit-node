import express, { NextFunction, Request, Response } from 'express';
import { Member } from '../types';

const prayerTimeRoutes = express.Router();

interface PrayerTimeResponse {
	Aksam: string;
	AyinSekliURL: string;
	GreenwichOrtalamaZamani: string;
	Gunes: string;
	GunesBatis: string;
	GunesDogus: string;
	HicriTarihKisa: string;
	HicriTarihKisaIso8601: string;
	HicriTarihUzun: string;
	HicriTarihUzunIso8601: string;
	Ikindi: string;
	Imsak: string;
	KibleSaati: string;
	MiladiTarihKisa: string;
	MiladiTarihKisaIso8601: string;
	MiladiTarihUzun: string;
	MiladiTarihUzunIso8601: string;
	Ogle: string;
	Yatsi: string;
}

prayerTimeRoutes.get('/today', async (_req: Request<any, any, Member>, res: Response, _next: NextFunction) => {
	const response = await fetch('https://ezanvakti.herokuapp.com/vakitler/13880');
	const data = (await response.json()) as PrayerTimeResponse[];

	const now = new Date();

	const prayerTime = data?.find(prayerTime => {
		const prayerDate = new Date(prayerTime.MiladiTarihUzunIso8601.split('T')[0]);

		return (
			prayerDate.getDate() === now.getDate() &&
			prayerDate.getMonth() === now.getMonth() &&
			prayerDate.getFullYear() === now.getFullYear()
		);
	});

	res.status(200).json({ prayerTime });
});

prayerTimeRoutes.get('/current', async (_req: Request<any, any, Member>, res: Response, _next: NextFunction) => {
	const response = await fetch('https://ezanvakti.herokuapp.com/vakitler/13880');
	const data = (await response.json()) as PrayerTimeResponse[];

	const now = new Date();

	const prayerTimeIndex = data?.findIndex(prayerTime => {
		const prayerDate = new Date(prayerTime.MiladiTarihUzunIso8601.split('T')[0]);

		return (
			prayerDate.getDate() === now.getDate() &&
			prayerDate.getMonth() === now.getMonth() &&
			prayerDate.getFullYear() === now.getFullYear()
		);
	});

	const prayerTime = data[prayerTimeIndex];
	const prayerTimeTomorrow = data[prayerTimeIndex + 1];

	let time = '';
	let text = '';

	// Get current timestamp in HH:MM format
	const currentTime = `${now.getHours()}:${now.getMinutes()}`;

	console.log({ currentTime, prayerTime, prayerTimeTomorrow });

	if (currentTime > prayerTime.Imsak && currentTime < prayerTime.Gunes) {
		time = prayerTime.Gunes;
		text = 'Güneş';
	}
	// Is Ogle
	else if (currentTime > prayerTime.Gunes && currentTime < prayerTime.Ogle) {
		time = prayerTime.Ogle;
		text = 'Öğle';
	}
	// Is Ikindi
	else if (currentTime > prayerTime.Ogle && currentTime < prayerTime.Ikindi) {
		time = prayerTime.Ikindi;
		text = 'İkindi';
	}
	// Is Aksam
	else if (currentTime > prayerTime.Ikindi && currentTime < prayerTime.Aksam) {
		time = prayerTime.Aksam;
		text = 'Akşam';
	}
	// Is Yatsi
	else if (currentTime > prayerTime.Aksam && currentTime < prayerTime.Yatsi) {
		time = prayerTime.Yatsi;
		text = 'Yatsı';
	}
	// Is Imsak of tomorrow
	else {
		time = prayerTimeTomorrow.Imsak;
		text = 'İmsak';
	}

	// res.status(200).json({ time, text: `${time} - ${text}` });
	res.status(200).json({
		frames: [
			{
				text: time,
				icon: '7943',
				duration: 10000 // 10 seconds
			},
			{
				text,
				icon: '7943',
				duration: 5000 // 5 seconds
			}
		]
	});
});

export { prayerTimeRoutes };
