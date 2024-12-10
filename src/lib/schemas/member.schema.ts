import { object, string, InferType, number } from 'yup';

export const memberSchema = object({
	body: object({
		name: string().required('Provid a value'),
		birthday: string().required('Provid a value'),
		address: string().required('Provid a value'),
		zip: string().required('Provid a value'),
		phone: string().required('Provid a value'),
		city: string().required('Provid a value'),
		email: string().required('Provid a value').email('Provide a valid email address'),
		bank: string().required('Provid a value'),
		amount: number().min(10, 'Minimum amount is 10').typeError('Provid a value')
	})
});

export type MemberSchema = InferType<typeof memberSchema>;
