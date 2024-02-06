import 'module-alias/register';
import 'reflect-metadata';
import express, { Express } from 'express';
import { appConfig } from '@/common/configs/app.config';
import { appRoute } from '@/routes/app.route';
import { DatabaseService } from '@/common/services/database.service';
import bodyParser from 'body-parser';

class App {
    private app: Express;
    private database: DatabaseService;

    getDatabase() {
        return this.database;
    }

    constructor() {
        this.app = express();
        this.database = new DatabaseService();
    }

    middleware() {
        this.app.use(bodyParser.json());
        this.app.use('/api', appRoute);
    }

    async startApp() {
        this.middleware();
        this.app.listen(appConfig.port, () => {
            console.log(`App listening in: http://localhost:${appConfig.port}`);
        });
    }
}

const app = new App();
app.startApp();
const database = app.getDatabase();
export { database };
