import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { ProfileEntity } from '@/entities/profile.entity';
import { RoleEntity } from '@/entities/role.entity';
import { CartEntity } from '@/entities/cart.entity';
import { OrderEntity } from '@/entities/order.entity';
import { PaymentEntity } from '@/entities/payment.entity';

@Entity({
    name: 'account',
    schema: 'account',
})
class AccountEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true,
        nullable: false,
        type: 'varchar',
        length: 255,
    })
    username: string;

    @Column({
        nullable: false,
        type: String,
    })
    password: string;

    @Column({
        type: 'boolean',
        name: 'is_active',
    })
    isActive: boolean;

    @ManyToOne(() => RoleEntity, (role) => role.accounts)
    @JoinColumn()
    role: RoleEntity;

    @OneToOne(() => ProfileEntity, (profile) => profile.account)
    profile: ProfileEntity;

    @OneToMany(() => CartEntity, (cart) => cart.account)
    carts: CartEntity[];

    @OneToMany(() => OrderEntity, (order) => order.account)
    orders: OrderEntity[];

    @OneToMany(() => PaymentEntity, (payment) => payment.account)
    payments: PaymentEntity[];
}

export { AccountEntity };
