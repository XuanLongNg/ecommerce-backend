import { totp } from 'otplib';
import { BadRequestException } from '@/common/exceptions/bad-request.exception';

class OtpService {
    private totp;

    constructor() {
        this.totp = totp;
        this.totp.options = {
            step: 600,
        };
    }

    genOtp(secret: string) {
        return this.totp.generate(secret);
    }

    verifyOtp(token: string, secret: string) {
        const isVerify = this.totp.verify({
            token,
            secret,
        });
        if (!isVerify) {
            throw new BadRequestException('Invalid OTP');
        }
    }
}

const otpService = new OtpService();

export { otpService, OtpService };
