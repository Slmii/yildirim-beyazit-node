import { z } from 'zod';

export const contactSchema = z.object({
	body: z.object({
		name: z.string({ required_error: 'Provide a valid name' }),
		email: z.string().email('Provide a valid email address'),
		phone: z.string({ required_error: 'Provide a valid phone number' }),
		message: z.string({ required_error: 'Provide a message' })
	})
});

export type ContactSchema = z.infer<typeof contactSchema>;
