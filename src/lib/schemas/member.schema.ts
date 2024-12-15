import { z } from 'zod';

export const memberSchema = z.object({
	name: z.string({ required_error: 'Provide a valid name' }),
	birthday: z.string({ required_error: 'Provide a valid birthday' }),
	address: z.string({ required_error: 'Provide a valid address' }),
	zip: z.string({ required_error: 'Provide a valid zip code' }),
	phone: z.string({ required_error: 'Provide a valid phone number' }),
	city: z.string({ required_error: 'Provide a valid city' }),
	email: z.string().email('Provide a valid email address'),
	bank: z.string({ required_error: 'Provide a valid bank' }),
	amount: z.number().min(10, 'Minimum amount is 10')
});

export type MemberSchema = z.infer<typeof memberSchema>;
