import { AuthEntity } from '@modules/auth/entities/auth.entity';
import { Column, Repository } from 'typeorm';
import { SignUpDto } from '@modules/auth/dto/sign-up.dto';
import { UserEntity } from '@modules/user/entities/user.entity';
import { IsNumber, IsString } from 'class-validator';
import { database } from '@/app';
import { BadRequestException } from '@/common/exceptions/bad-request.exception';

class AuthService {
    constructor() {}

    async signUp(signUpDto: SignUpDto) {
        const isAccountExits = await database.authRepository.findOneBy({
            username: signUpDto.username,
        });
        if (isAccountExits) {
            throw new BadRequestException('Account already exits');
        }
        const user = database.userRepository.create({
            name: signUpDto.name,
            date_of_birth: signUpDto.date_of_birth,
            avatar: signUpDto.avatar,
        });
        await database.userRepository.save(user);
        const account = database.authRepository.create({
            username: signUpDto.username,
            password: signUpDto.password,
            user: user,
        });
        await database.authRepository.save(account);
        return {
            data: {
                account,
            },
        };
    }
}

const authService = new AuthService();
export { AuthService, authService };
