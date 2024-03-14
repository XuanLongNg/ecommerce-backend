import dotenv from 'dotenv';
import { EDatabaseType } from '@/common/enums/database.enum';

class AppConfig {
    port: string;

    dbDatabase: string;
    dbHost: string;
    dbPort: number;
    dbUsername: string;
    dbPassword: string;
    dbType: EDatabaseType;

    jwtPrivateKey: string;
    jwtPrivateExp: number;
    jwtPublicKey: string;
    jwtPublicExp: number;

    mailAccount: string;
    mailPassword: string;

    otpSecret: string;

    constructor() {
        dotenv.config();
        this.port = this.getEnv('PORT');

        this.dbDatabase = this.getEnv('DB_DATABASE');
        this.dbHost = this.getEnv('DB_HOST');
        this.dbPort = parseInt(this.getEnv('DB_PORT'));
        this.dbUsername = this.getEnv('DB_USERNAME');
        this.dbPassword = this.getEnv('DB_PASSWORD');
        this.dbType = this.getEnv('DB_TYPE') as EDatabaseType;

        this.jwtPrivateKey = this.getEnv('JWT_PRIVATE_KEY');
        this.jwtPrivateExp = parseInt(this.getEnv('JWT_PRIVATE_EXP'));
        this.jwtPublicKey = this.getEnv('JWT_PUBLIC_KEY');
        this.jwtPublicExp = parseInt(this.getEnv('JWT_PUBLIC_EXP'));

        this.mailAccount = this.getEnv('MAIL_ACCOUNT');
        this.mailPassword = this.getEnv('MAIL_PASSWD');

        this.otpSecret = this.getEnv('OTP_SECRET');
    }

    getEnv(env: string): string {
        const value = process.env[env];
        if (!value) {
            throw new Error('Env is not exits');
        }
        return value;
    }
}

const appConfig = new AppConfig();

export { appConfig, AppConfig };
