import HttpStatus from 'http-status-codes';
import { BaseException } from '@/common/exceptions/base.exception';

class BadRequestException extends BaseException {
    constructor(message: string, ...other: any) {
        super({
            code: HttpStatus.BAD_REQUEST,
            status: 'Bad request',
            message: message,
            error: other,
        });
    }
}

export { BadRequestException };
