import { IsEmail, isEmail } from 'class-validator';

export class NotifyEmailDto {
  @IsEmail()
  email: string;
}
