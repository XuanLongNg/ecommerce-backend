import { Column, Repository } from 'typeorm';
import { SignUpDto } from '@modules/auth/dto/sign-up.dto';
import { ProfileEntity } from '@/entities/profile.entity';
import { IsNumber, IsString } from 'class-validator';
import { database } from '@/app';
import { BadRequestException } from '@/common/exceptions/bad-request.exception';

class AuthService {
    constructor() {}

    async signUp(signUpDto: SignUpDto) {
        const isAccountExits = await database.accountRepository.findOneBy({
            username: signUpDto.username,
        });
        if (isAccountExits) {
            throw new BadRequestException('Account already exits');
        }
        const user = database.profileRepository.create({
            name: signUpDto.name,
            date_of_birth: signUpDto.date_of_birth,
            avatar: signUpDto.avatar,
        });
        await database.profileRepository.save(user);
        // const account = database.accountRepository.create({
        //     username: signUpDto.username,
        //     password: signUpDto.password,
        //     user: user,
        // });
        // await database.accountRepository.save(account);
        return {
            data: {
                // account,
            },
        };
    }
}

const authService = new AuthService();
export { AuthService, authService };
