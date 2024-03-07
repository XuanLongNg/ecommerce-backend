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
    })
    status: EOrderStatus;

    @Column({
        type: String,
    })
    note: string;

    @Column({
        type: Number,
        name: 'total_price',
    })
    totalPrice: number;

    @OneToOne(() => AddressEntity, (address) => address.order)
    @JoinColumn({ name: 'delivery_address' })
    address: AddressEntity;

    @ManyToOne(() => AccountEntity, (account) => account.orders)
    @JoinColumn({ name: 'account_id' })
    account: AccountEntity;

    @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
    orderItems: OrderItemEntity[];

    @OneToOne(() => PaymentEntity, (payment) => payment.order)
    payment: PaymentEntity;
}

export { OrderEntity };
