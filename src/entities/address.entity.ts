import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { CountryEntity } from '@/entities/country.entity';
import { CityEntity } from '@/entities/city.entity';
import { OrderEntity } from '@/entities/order.entity';

@Entity({
    name: 'address',
    schema: 'address',
})
class AddressEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => CountryEntity, (country) => country.addresses)
    @JoinColumn({ name: 'country_id' })
    countries: CountryEntity;

    @ManyToOne(() => CityEntity, (city) => city.addresses)
    @JoinColumn({ name: 'city_id' })
    cities: CityEntity;

    @Column({
        type: 'varchar',
        length: 255,
    })
    details: string;

    @OneToOne(() => OrderEntity, (order) => order.address)
    order: OrderEntity;
}

export { AddressEntity };
