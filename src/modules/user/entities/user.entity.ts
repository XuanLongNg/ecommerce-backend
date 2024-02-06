import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { AuthEntity } from '@modules/auth/entities/auth.entity';

@Entity({
    name: 'user',
    schema: 'user',
})
class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsString()
    name: string;

    @Column()
    @IsNumber()
    date_of_birth: number;

    @Column()
    @IsString()
    avatar: string;
}

export { UserEntity };
