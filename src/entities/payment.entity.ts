import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { AccountEntity } from '@/entities/account.entity';
import {
    EPaymentMethod,
    EPaymentStatus,
} from '@modules/payment/enums/payment.enum';
import { OrderEntity } from '@/entities/order.entity';

@Entity({
    name: 'payment',
    schema: 'payment',
})
class PaymentEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: EPaymentStatus,
        nullable: false,
    })
    status: EPaymentStatus;

    @Column({
        type: 'enum',
        enum: EPaymentMethod,
        name: 'payment_method',
        nullable: false,
    })
    paymentMethod: EPaymentMethod;

    @Column({
        type: Number,
        name: 'total_price',
        nullable: false,
    })
    totalPrice: string;

    @Column({
        type: 'varchar',
        length: 50,
        name: 'purchased_time',
        default: new Date().getTime().toString(),
    })
    purchaseTime: string;

    @Column({
        type: String,
        name: 'transaction_id',
        nullable: false,
    })
    transactionId: String;

    @ManyToOne(() => AccountEntity, (account) => account.payments, {
        nullable: false,
    })
    @JoinColumn({ name: 'account_id' })
    account: AccountEntity;

    @OneToOne(() => OrderEntity, (order) => order.payment, {
        nullable: false,
    })
    @JoinColumn({ name: 'order_id' })
    order: OrderEntity;
}

export { PaymentEntity };
