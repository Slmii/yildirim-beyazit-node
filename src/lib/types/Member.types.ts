import { Prisma } from '@prisma/client';

export interface Member {
	name: string;
	birthday: string;
	address: string;
	phone: string;
	zip: string;
	city: string;
	email: string;
	bank: string;
	amount: string;
}

export interface SearchMembersParams {
	page?: string;
	take?: string;
	query?: string;
	orderBy?: string;
	order?: string;
}

export interface AddMember {
	email: string;
	name: string;
	address: string;
	zip: string;
	city: string;
	phone: string;
	bank: string;
	amount: Prisma.Decimal;
}

export type EditMember = Partial<AddMember>;
