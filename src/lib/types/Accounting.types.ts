import { CategoryType } from '@prisma/client';

export interface EditAccountingCategory {
	name: string;
}

export interface AddAccountingCategory {
	name: string;
	type: CategoryType;
}
