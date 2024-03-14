import { IsEmail, IsString } from 'class-validator';

export class ChangePasswordDto {
    @IsEmail()
    username: string;

    @IsString()
    password: string;

    @IsString()
    newPassword: string;
}
