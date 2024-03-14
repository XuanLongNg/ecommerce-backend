import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { EOrderStatus } from '@modules/order/enums/order.enum';
import { AccountEntity } from '@/entities/account.entity';
import { OrderItemEntity } from '@/entities/order-item.entity';
import { PaymentEntity } from '@/entities/payment.entity';
import { AddressEntity } from '@/entities/address.entity';

@Entity({
    name: 'order',
    schema: 'order',
})
class OrderEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: EOrderStatus,
        nullable: false,
    })
    status: EOrderStatus;

    @Column({
        type: String,
        nullable: true,
    })
    note?: string;

    @Column({
        type: Number,
        name: 'total_price',
        nullable: false,
    })
    totalPrice: number;

    @OneToOne(() => AddressEntity, (address) => address.order, {
        nullable: false,
    })
    @JoinColumn({ name: 'delivery_address' })
    address: AddressEntity;

    @ManyToOne(() => AccountEntity, (account) => account.orders, {
        nullable: false,
    })
    @JoinColumn({ name: 'account_id' })
    account: AccountEntity;

    @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
    orderItems: OrderItemEntity[];

    @OneToOne(() => PaymentEntity, (payment) => payment.order)
    payment: PaymentEntity;
}

export { OrderEntity };
