import HttpStatus from 'http-status-codes';
import { BaseException } from '@/common/exceptions/base.exception';

class InternalServerException extends BaseException {
    constructor(message: string, ...other: any) {
        super({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            status: 'Internal server error',
            message: message,
            error: other,
        });
    }
}
