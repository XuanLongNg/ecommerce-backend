import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { ProductVariantEntity } from '@/entities/product-variant.entity';
import { AccountEntity } from '@/entities/account.entity';
import { OrderItemEntity } from '@/entities/order-item.entity';

@Entity({
    name: 'cart',
    schema: 'cart',
})
class CartEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: Number,
        default: 0,
        nullable: false,
    })
    quantity: number;

    @ManyToOne(
        () => ProductVariantEntity,
        (productVariant) => productVariant.carts,
        {
            nullable: false,
        }
    )
    @JoinColumn({ name: 'product_variant_id' })
    productVariant: ProductVariantEntity;

    @ManyToOne(() => AccountEntity, (account) => account.carts, {
        nullable: false,
    })
    @JoinColumn({ name: 'account_id' })
    account: AccountEntity;

    @OneToOne(() => OrderItemEntity, (orderItem) => orderItem.cart)
    orderItem: OrderItemEntity;
}

export { CartEntity };
