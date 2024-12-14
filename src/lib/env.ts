import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

// Define the schema as an object with all of the env
// variables and their types
const envSchema = z.object({
	PORT: z.coerce.number().min(1000),
	EMAIL_USERNAME: z.string().min(1),
	EMAIL_PASSWORD: z.string().min(1),
	DATABASE_URL: z.string().min(1),
	CLERK_PUBLISHABLE_KEY: z.string().min(1),
	CLERK_SECRET_KEY: z.string().min(1),
	NODE_ENV: z.string().min(1)
});

// Validate `process.env` against our schema
// and return the result
const envResult = envSchema.safeParse(process.env);

if (!envResult.success) {
	throw new Error('There is an error with the server environment variables');
}

export const env = envResult.data;

type Env = z.infer<typeof envSchema>;

declare global {
	namespace NodeJS {
		interface ProcessEnv extends Env {}
	}
}
