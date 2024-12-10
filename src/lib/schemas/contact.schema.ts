import { object, string, InferType } from 'yup';

export const contactSchema = object({
	body: object({
		name: string().required('Provid a value'),
		email: string().required('Provid a value').email('Provide a valid email address'),
		phone: string().required('Provid a value'),
		message: string().required('Provid a value')
	})
});

export type ContactSchema = InferType<typeof contactSchema>;
