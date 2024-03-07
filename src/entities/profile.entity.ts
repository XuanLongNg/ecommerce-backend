import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { EGender } from '@modules/user/enums/profile.enum';
import { AddressEntity } from '@/entities/address.entity';
import { AccountEntity } from '@/entities/account.entity';

@Entity({
    name: 'profile',
    schema: 'profile',
})
class ProfileEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true,
    })
    date_of_birth: string;

    @Column({
        type: 'enum',
        enum: EGender,
        nullable: true,
        default: EGender.OTHER,
    })
    gender: EGender;

    @Column({
        type: String,
    })
    avatar: string;

    @OneToOne(() => AddressEntity, (address) => address.id)
    @JoinColumn({ name: 'address_id' })
    address: AddressEntity;

    @OneToOne(() => AccountEntity, (account) => account.profile)
    @JoinColumn({ name: 'account_id' })
    account: AccountEntity;
}

export { ProfileEntity };
