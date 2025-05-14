import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailOptions } from './config/mail.options';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail({ to, token }: MailOptions) {
    try {
      const confirmUrl = `http://localhost:3000/weatherapi.app/api/confirm/${token}`;
      const unsubscribeUrl = `http://localhost:3000/weatherapi.app/api/unsubscribe/${token}`;

      await this.mailerService.sendMail({
        to: to,
        subject: 'Confirm subscription',
        html: `
          <p> Click <a href="${confirmUrl}">here</a> to confirm email.</p> 
          <p> Click <a href=${unsubscribeUrl}>here</a> to unsubscribe.</p>
        `,
      });

      console.log(`Email sent to ${to}`);
    } catch (err) {
      throw err;
    }
  }
}
