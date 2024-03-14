import { IsEmail } from 'class-validator';

export class SendMailResetDto {
    @IsEmail()
    email: string;
}
