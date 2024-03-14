import jwt from 'jsonwebtoken';

class JwtService {
    sign<T>(data: T, exp: number, privateKey: string) {
        return jwt.sign({ data }, privateKey, {
            expiresIn: exp,
        });
    }

    verify(token: string, privateKey: string) {
        return jwt.verify(token, privateKey);
    }
}

const jwtService = new JwtService();

export { jwtService, JwtService };
