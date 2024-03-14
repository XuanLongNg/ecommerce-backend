import HttpStatus from 'http-status-codes';
import { BaseException } from '@/common/exceptions/base.exception';

class UnauthorizedException extends BaseException {
    constructor(message: string, ...other: any) {
        super({
            code: HttpStatus.UNAUTHORIZED,
            status: 'Unauthorized',
            message: message,
            error: other,
        });
    }
}

export { UnauthorizedException };
