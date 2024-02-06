import dotenv from 'dotenv';
import { EDatabaseType } from '@/common/enums/database.enum';

class AppConfig {
    port: string;
    db_database: string;
    db_host: string;
    db_port: number;
    db_username: string;
    db_password: string;
    db_type: EDatabaseType;
    constructor() {
        dotenv.config();
        this.port = this.getEnv('PORT');
        this.db_database = this.getEnv('DB_DATABASE');
        this.db_host = this.getEnv('DB_HOST');
        this.db_port = parseInt(this.getEnv('DB_PORT'));
        this.db_username = this.getEnv('DB_USERNAME');
        this.db_password = this.getEnv('DB_PASSWORD');
        this.db_type = this.getEnv('DB_TYPE') as EDatabaseType;
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
