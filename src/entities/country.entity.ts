import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { AddressEntity } from '@/entities/address.entity';

@Entity({
    name: 'country',
    schema: 'country',
})
class CountryEntity extends BaseEntity {
    @PrimaryColumn({
        type: 'varchar',
        length: 2,
    })
    id: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name: string;

    @Column({
        type: String,
        nullable: true,
    })
    flag?: string;

    @OneToMany(() => AddressEntity, (address) => address.city)
    addresses: AddressEntity[];
}

export { CountryEntity };
