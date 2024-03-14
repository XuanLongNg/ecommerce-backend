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
        length: 5,
    })
    id: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name: string;

    @OneToMany(() => AddressEntity, (address) => address.city)
    addresses: AddressEntity[];
}

export { CityEntity };
