import nodemailer from 'nodemailer';

export const email = ({ html, subject }: { subject: string; html: string }) => {
	try {
		const transporter = nodemailer.createTransport({
			host: 'smtp.office365.com',
			auth: {
				user: `${process.env.EMAIL_USERNAME}`,
				pass: `${process.env.EMAIL_PASSWORD}`
			},
			port: 587,
			tls: {
				ciphers: 'SSLv3'
			},
			requireTLS: true
		});

		return transporter.sendMail({
			from: `Yıldırım Beyazıt Cami <${process.env.EMAIL_USERNAME}>`,
			to: `${process.env.EMAIL_USERNAME}`,
			subject,
			text: subject,
			html
		});
	} catch (error) {
		throw error;
	}
};
