import HttpStatus from 'http-status-codes';
import { BaseException } from '@/common/exceptions/base.exception';

class ForbiddenException extends BaseException {
    constructor(message: string, ...other: any) {
        super({
            code: HttpStatus.FORBIDDEN,
            status: 'Forbidden',
            message: message,
            error: other,
        });
    }
}

export { ForbiddenException };
