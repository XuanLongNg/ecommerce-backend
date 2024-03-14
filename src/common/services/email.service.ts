import nodemailer from 'nodemailer';
import { appConfig } from '@/common/configs/app.config';

class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: appConfig.mailAccount,
                pass: appConfig.mailPassword,
            },
        });
    }

    async sendEmail({
        from,
        to,
        subject,
        text,
    }: {
        from: string;
        to: string;
        subject: string;
        text: string;
    }) {
        try {
            const info = await this.transporter.sendMail({
                from: from,
                to: to,
                subject: subject,
                text: text,
            });
            return info;
        } catch (error) {}
    }
}

const emailService = new EmailService();

export { emailService, EmailService };
