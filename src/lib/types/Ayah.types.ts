export interface AddAyah {
	ayah: number;
	surah: number;
	completeSurah: boolean;
}

export enum Language {
	TR = 'TR',
	NL = 'NL',
	AR = 'AR'
}

export enum AyahLanguage {
	NL = 'nl.siregar',
	TR = 'tr.diyanet',
	AR = 'quran-simple-enhanced'
}
