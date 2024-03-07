import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
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
    })
    status: EPaymentStatus;

    @Column({
        type: 'enum',
        enum: EPaymentMethod,
        name: 'payment_method',
    })
    paymentMethod: EPaymentMethod;

    @Column({
        type: Number,
        name: 'total_price',
    })
    totalPrice: string;

    @Column({
        type: 'varchar',
        length: 50,
        name: 'purchased_time',
    })
    purchaseTime: string;

    @Column({
        type: String,
        name: 'transaction_id',
    })
    transactionId: String;

    @ManyToOne(() => AccountEntity, (account) => account.payments)
    @JoinColumn({ name: 'account_id' })
    account: AccountEntity;

    @OneToMany(() => OrderEntity, (order) => order.payment)
    order: OrderEntity;
}

export { PaymentEntity };
