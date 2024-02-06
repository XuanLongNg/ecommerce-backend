import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    AfterInsert,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { UserEntity } from '@modules/user/entities/user.entity';
import { database } from '@/app';

@Entity({
    name: 'auth',
    schema: 'auth',
})
class AuthEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true,
    })
    @IsEmail()
    username: string;

    @Column()
    password: string;

    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity;
}

export { AuthEntity };
