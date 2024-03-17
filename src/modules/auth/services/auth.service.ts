import { SignUpDto } from '@modules/auth/dto/sign-up.dto';
import { database } from '@/app';
import { BadRequestException } from '@/common/exceptions/bad-request.exception';
import { NotFoundException } from '@/common/exceptions/not-found.exception';
import { hashTextService } from '@/common/services/hash-text.service';
import { LoginDto } from '@modules/auth/dto/login.dto';
import { ForbiddenException } from '@/common/exceptions/forbidden.exception';
import { jwtService } from '@/common/services/jwt.service';
import { appConfig } from '@/common/configs/app.config';
import { ChangePasswordDto } from '@modules/auth/dto/change-password.dto';
import { otpService } from '@/common/services/otp.service';
import { ResetPasswordDto } from '@modules/auth/dto/reset-password.dto';
import { emailService } from '@/common/services/email.service';
import { SendMailResetDto } from '@modules/auth/dto/send-mail-reset.dto';
import { RefreshTokenDto } from '@modules/auth/dto/refresh-token.dto';
import { AccountEntity } from '@/entities/account.entity';
import { JwtPayload } from 'jsonwebtoken';
import { UnauthorizedException } from '@/common/exceptions/unauthorized.exception';

class AuthService {
    constructor() {}

    async isAccountExists(username: string): Promise<Boolean> {
        return await database.accountRepository.existsBy({
            username: username,
        });
    }

    async signUp(request: SignUpDto) {
        const isExists = await this.isAccountExists(request.username);

        if (isExists) {
            throw new BadRequestException('Account already exists');
        }

        const role = await database.roleRepository.findOne({
            where: {
                id: 1,
            },
        });

        if (!role) {
            throw new NotFoundException(`Role with id: 1 doesn't exists`);
        }

        const password = await hashTextService.hashText(request.password);

        const account = await database.accountRepository.save({
            username: request.username,
            password: password,
            role: role,
            isActive: true,
        });

        const country = await database.countryRepository.findOne({
            where: {
                id: request.countryId,
            },
        });

        if (!country) {
            throw new NotFoundException(
                `Country with id: ${request.countryId} doesn't exists`
            );
        }

        const city = await database.cityRepository.findOne({
            where: {
                id: request.cityId,
            },
        });

        if (!city) {
            throw new NotFoundException(
                `City with id: ${request.countryId} doesn't exists`
            );
        }

        const address = await database.addressRepository.save({
            country: country,
            city: city,
            details: request.details,
            createdBy: account.id,
        });

        const user = await database.profileRepository.save({
            name: request.name,
            address: address,
            gender: request.gender,
            date_of_birth: request.date_of_birth,
            avatar: request.avatar,
            createdBy: account.id,
            updatedBy: account.id,
            account: account,
        });

        return {
            data: user,
        };
    }

    async login(request: LoginDto) {
        const account = await database.accountRepository.findOneBy({
            username: request.username,
        });
        if (!account) {
            throw new ForbiddenException('Username or password incorrect!');
        }
        const isCorrectPassword = await hashTextService.compareText(
            request.password,
            account.password
        );

        if (!isCorrectPassword) {
            throw new ForbiddenException('Username or password incorrect!');
        }

        const publicKey = jwtService.sign(
            account,
            appConfig.jwtPublicExp,
            appConfig.jwtPublicKey
        );

        const privateKey = jwtService.sign(
            account,
            appConfig.jwtPrivateExp,
            appConfig.jwtPrivateKey
        );

        return {
            data: account,
            meta: {
                payload: {
                    privateKey,
                    publicKey,
                },
            },
        };
    }

    async changePassword(request: ChangePasswordDto) {
        const { username, password, newPassword } = request;
        const isExists = await database.accountRepository.findOneBy({
            username,
        });
        if (!isExists) {
            throw new ForbiddenException('Username or password incorrect');
        }

        const isCorrect = await hashTextService.compareText(
            password,
            isExists.password
        );

        if (!isCorrect) {
            throw new ForbiddenException('Username or password incorrect');
        }

        await database.accountRepository.update(
            {
                username: username,
            },
            {
                password: await hashTextService.hashText(newPassword),
            }
        );
    }

    async resetPassword(request: ResetPasswordDto) {
        try {
            otpService.verifyOtp(request.otp, appConfig.otpSecret);

            const password = await hashTextService.hashText(request.password);

            await database.accountRepository.update(
                {
                    username: request.username,
                },
                {
                    username: request.username,
                    password,
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async sendMailReset(request: SendMailResetDto) {
        const { email } = request;
        try {
            const otp = otpService.genOtp(appConfig.otpSecret);

            const info = {
                from: appConfig.mailAccount,
                to: email,
                subject: 'Email reset password',
                text:
                    'This is the password reset email.\nPlease visit the page: https://www.facebook.com/ and enter the OTP code to retrieve your password.' +
                    `\nOTP code valid for 10 minutes: ${otp}`,
            };
            await emailService.sendEmail(info);
        } catch (error) {
            throw error;
        }
    }

    async handleRefreshToken(request: RefreshTokenDto) {
        try {
            const { privateKey } = request;

            const decodeData: JwtPayload = jwtService.verify(
                privateKey,
                appConfig.jwtPrivateKey
            ) as JwtPayload;

            delete decodeData.exp;

            const publicKey = jwtService.sign(
                decodeData.data,
                appConfig.jwtPublicExp,
                appConfig.jwtPublicKey
            );
            return {
                data: { ...decodeData.data },
                meta: {
                    payload: {
                        publicKey,
                        privateKey,
                    },
                },
            };
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}

const authService = new AuthService();
export { AuthService, authService };
