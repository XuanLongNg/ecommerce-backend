import {
    IsEmail,
    IsEnum,
    IsNumber,
    IsString,
    IsStrongPassword,
} from 'class-validator';
import { EGender } from '@modules/user/enums/profile.enum';

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

    @IsEnum(EGender)
    gender: EGender;

    @IsString()
    countryId: string;

    @IsString()
    cityId: string;

    @IsString()
    details: string;
}
