import {
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { CartEntity } from '@/entities/cart.entity';
import { OrderEntity } from '@/entities/order.entity';

@Entity({
    name: 'orderItem',
    schema: 'orderItem',
})
class OrderItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => CartEntity, (cart) => cart.orderItem)
    @JoinColumn({ name: 'cart_id' })
    cart: CartEntity;

    @ManyToOne(() => OrderEntity, (order) => order.orderItems)
    @JoinColumn({ name: 'order_id' })
    order: OrderEntity;
}

export { OrderItemEntity };
