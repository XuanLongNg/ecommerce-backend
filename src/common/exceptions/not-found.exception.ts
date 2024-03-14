import HttpStatus from 'http-status-codes';
import { BaseException } from '@/common/exceptions/base.exception';

class NotFoundException extends BaseException {
    constructor(message: string, ...other: any) {
        super({
            code: HttpStatus.NOT_FOUND,
            status: 'Not found',
            message: message,
            error: other,
        });
    }
}

export { NotFoundException };
