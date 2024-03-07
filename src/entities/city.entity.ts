import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { AddressEntity } from '@/entities/address.entity';

@Entity({
    name: 'city',
    schema: 'city',
})
class CityEntity extends BaseEntity {
    @PrimaryColumn({
        type: 'varchar',
        length: 2,
    })
    id: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    name: string;

    @OneToMany(() => AddressEntity, (address) => address.cities)
    addresses: AddressEntity[];
}

export { CityEntity };
