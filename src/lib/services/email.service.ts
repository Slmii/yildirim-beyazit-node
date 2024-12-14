import { env } from 'src/lib/env';
import nodemailer from 'nodemailer';

export const email = ({ html, subject }: { subject: string; html: string }) => {
	try {
		const transporter = nodemailer.createTransport({
			host: 'smtp.office365.com',
			auth: {
				user: `${env.EMAIL_USERNAME}`,
				pass: `${env.EMAIL_PASSWORD}`
			},
			port: 587,
			tls: {
				ciphers: 'SSLv3'
			},
			requireTLS: true
		});

		return transporter.sendMail({
			from: `Yıldırım Beyazıt Cami <${env.EMAIL_USERNAME}>`,
			to: `${env.EMAIL_USERNAME}`,
			subject,
			text: subject,
			html
		});
	} catch (error) {
		throw error;
	}
};
