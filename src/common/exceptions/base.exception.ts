interface IErrorArgument {
    message: string;
    status: string;
    code: number;
    error: any;
}

class BaseException extends Error {
    message: string;
    status: string;
    code: number;
    error: any;

    constructor(args: IErrorArgument) {
        super();
        this.message = args.message;
        this.status = args.status;
        this.code = args.code;
        this.error = args.error;
    }
}

export { BaseException, IErrorArgument };
