import { IsEmail, IsNumber, IsString, IsStrongPassword } from 'class-validator';

export class SignUpDto {
    @IsEmail()
    username: string;

    @IsString()
    password: string;

    @IsString()
    name: string;

    @IsNumber()
    date_of_birth: string;

    @IsString()
    avatar: string;
}
