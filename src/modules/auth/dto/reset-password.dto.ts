import { IsEmail, IsString } from 'class-validator';

export class ResetPasswordDto {
    @IsEmail()
    username: string;

    @IsString()
    password: string;

    @IsString()
    otp: string;
}
