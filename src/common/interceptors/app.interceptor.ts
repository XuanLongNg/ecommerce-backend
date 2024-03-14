import { Request, Response, NextFunction } from 'express';

const appInterceptor = (req: Request, res: Response, next: NextFunction) => {
    let send = res.send;

    res.send = function (data) {
        if (typeof data == 'object' && data !== null && 'password' in data) {
            delete data.password;
        }
        send.apply(res, data);
        res.send = send;
        return res.send(send);
    };
    console.log(res);

    next();
};

export { appInterceptor };
