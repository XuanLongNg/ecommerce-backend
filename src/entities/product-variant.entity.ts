import {
    Entity,
    Column,
    OneToMany,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { ProductEntity } from '@/entities/product.entity';
import { CartEntity } from '@/entities/cart.entity';

@Entity({
    name: 'productVariant',
    schema: 'productVariant',
})
class ProductVariantEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    color: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    size: string;

    @Column({
        type: String,
    })
    image: string;

    @Column({
        type: Number,
        default: 0,
    })
    quantity: number;

    @Column({
        type: Number,
        default: 0,
    })
    sold: number;

    @ManyToOne(() => ProductEntity, (product) => product.productVariants)
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;

    @OneToMany(() => CartEntity, (cart) => cart.productVariant)
    carts: CartEntity[];
}

export { ProductVariantEntity };
