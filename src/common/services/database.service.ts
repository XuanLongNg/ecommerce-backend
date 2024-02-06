import { DataSource, Repository } from 'typeorm';
import { appConfig } from '@/common/configs/app.config';
import { AuthEntity } from '@modules/auth/entities/auth.entity';
import { UserEntity } from '@modules/user/entities/user.entity';

class DatabaseService {
    private readonly dataSource: DataSource;
    public authRepository: Repository<AuthEntity>;
    public userRepository: Repository<UserEntity>;

    constructor() {
        this.dataSource = new DataSource({
            type: appConfig.db_type,
            host: appConfig.db_host,
            port: appConfig.db_port,
            username: appConfig.db_username,
            password: appConfig.db_password,
            database: appConfig.db_database,
            entities: [AuthEntity, UserEntity],
            // logging: true,
            synchronize: true,
        });
        this.dataSource
            .initialize()
            .then((dataSource) => {
                console.log('Data Source has been initialized!');
                this.authRepository =
                    dataSource.manager.getRepository(AuthEntity);
                this.userRepository =
                    dataSource.manager.getRepository(UserEntity);
            })
            .catch((error) => {
                console.error(
                    'Error during Data Source initialization:',
                    error
                );
                throw new Error(error);
            });
    }

    async initialize() {
        try {
            await this.dataSource.initialize();
            console.log('Data Source has been initialized!');
        } catch (error: any) {
            console.error('Error during Data Source initialization:', error);
            throw new Error(error);
        }
    }

    get database() {
        if (!this.dataSource.isInitialized) {
            throw new Error('Data source is not initialization');
        }
        return this.dataSource;
    }
}

export { DatabaseService };
