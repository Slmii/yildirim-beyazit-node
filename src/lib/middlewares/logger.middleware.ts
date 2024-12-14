import { NextFunction, Response, Request } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
	const remoteAddress = req.socket.remoteAddress ?? req.ip;
	const reqMethod = `${req.method} HTTP/${req.httpVersion}`;
	const url = req.originalUrl ?? req.url;
	const contentLength = `Content length: ${req.headers['content-length'] ?? '-'}`;
	const referred = req.headers.referrer || req.headers.referer || '-';
	const userAgent = req.headers['user-agent'];

	console.log(
		`[${new Date().toISOString()}]: ${remoteAddress} | ${reqMethod} | ${url} | ${contentLength} | ${referred} | ${userAgent}`
	);

	next();
};
