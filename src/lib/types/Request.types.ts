import { AuthObject } from '@clerk/express';
import { Request } from 'express';

export interface IRequest<T = unknown> extends Request<unknown, unknown, T> {
	auth?: AuthObject;
}
