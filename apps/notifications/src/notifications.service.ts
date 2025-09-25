import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { NotifyEmailDto } from './dto/notify-email.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {
    this.transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get('SMTP_USER'),
        clientId: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
        clientSecret: this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
        refreshToken: this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN'),
      },
    });
  }

  private readonly transport: nodemailer.Transporter;

  async notifyEmail({ email, text }: NotifyEmailDto) {
    this.transport.sendMail({
      from: this.configService.get('SMTP_USER'),
      to: email,
      subject: 'Sleeper Notification',
      text,
    });

    console.log('email', email);
  }
}
