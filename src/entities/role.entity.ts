import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { AccountEntity } from '@/entities/account.entity';

@Entity({
    name: 'role',
    schema: 'role',
})
class RoleEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name: string;

    @OneToMany(() => AccountEntity, (AccountEntity) => AccountEntity.role)
    accounts: AccountEntity[];
}

export { RoleEntity };
