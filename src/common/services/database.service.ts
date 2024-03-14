import { DataSource, Repository } from 'typeorm';
import { appConfig } from '@/common/configs/app.config';
import { AccountEntity } from '@/entities/account.entity';
import { ProfileEntity } from '@/entities/profile.entity';
import { AddressEntity } from '@/entities/address.entity';
import { CartEntity } from '@/entities/cart.entity';
import { CategoryEntity } from '@/entities/category.entity';
import { CityEntity } from '@/entities/city.entity';
import { CountryEntity } from '@/entities/country.entity';
import { OrderEntity } from '@/entities/order.entity';
import { OrderItemEntity } from '@/entities/order-item.entity';
import { PaymentEntity } from '@/entities/payment.entity';
import { ProductEntity } from '@/entities/product.entity';
import { ProductCategoryEntity } from '@/entities/product-category.entity';
import { ProductVariantEntity } from '@/entities/product-variant.entity';
import { RoleEntity } from '@/entities/role.entity';

class DatabaseService {
    private readonly dataSource: DataSource;
    public accountRepository: Repository<AccountEntity>;
    public profileRepository: Repository<ProfileEntity>;
    public addressRepository: Repository<AddressEntity>;
    public cartRepository: Repository<CartEntity>;
    public categoryRepository: Repository<CategoryEntity>;
    public cityRepository: Repository<CityEntity>;
    public countryRepository: Repository<CountryEntity>;
    public orderRepository: Repository<OrderEntity>;
    public orderItemRepository: Repository<OrderItemEntity>;
    public paymentRepository: Repository<PaymentEntity>;
    public productRepository: Repository<ProductEntity>;
    public productCategoryRepository: Repository<ProductCategoryEntity>;
    public productVariantRepository: Repository<ProductVariantEntity>;
    public roleRepository: Repository<RoleEntity>;

    constructor() {
        this.dataSource = new DataSource({
            type: appConfig.dbType,
            host: appConfig.dbHost,
            port: appConfig.dbPort,
            username: appConfig.dbUsername,
            password: appConfig.dbPassword,
            database: appConfig.dbDatabase,
            entities: [
                AccountEntity,
                ProfileEntity,
                AddressEntity,
                CartEntity,
                CategoryEntity,
                CityEntity,
                CountryEntity,
                OrderItemEntity,
                OrderEntity,
                PaymentEntity,
                ProductEntity,
                ProductCategoryEntity,
                ProductVariantEntity,
                RoleEntity,
            ],
            logging: true,
            synchronize: false,
            charset: 'utf8mb4',
        });
        this.dataSource
            .initialize()
            .then((dataSource) => {
                console.log('Data Source has been initialized!');
                this.accountRepository =
                    dataSource.manager.getRepository(AccountEntity);
                this.addressRepository =
                    dataSource.manager.getRepository(AddressEntity);
                this.cartRepository =
                    dataSource.manager.getRepository(CartEntity);
                this.categoryRepository =
                    dataSource.manager.getRepository(CategoryEntity);
                this.cityRepository =
                    dataSource.manager.getRepository(CityEntity);
                this.countryRepository =
                    dataSource.manager.getRepository(CountryEntity);
                this.orderRepository =
                    dataSource.manager.getRepository(OrderEntity);
                this.orderItemRepository =
                    dataSource.manager.getRepository(OrderItemEntity);
                this.paymentRepository =
                    dataSource.manager.getRepository(PaymentEntity);
                this.productRepository =
                    dataSource.manager.getRepository(ProductEntity);
                this.productCategoryRepository =
                    dataSource.manager.getRepository(ProductCategoryEntity);
                this.productVariantRepository =
                    dataSource.manager.getRepository(ProductVariantEntity);
                this.profileRepository =
                    dataSource.manager.getRepository(ProfileEntity);
                this.roleRepository =
                    dataSource.manager.getRepository(RoleEntity);
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
