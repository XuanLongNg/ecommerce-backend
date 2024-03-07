import { Column, Repository } from 'typeorm';
import { SignUpDto } from '@modules/auth/dto/sign-up.dto';
import { IsNumber, IsString } from 'class-validator';
import { ProfileEntity } from '@/entities/profile.entity';

class UserService {
    constructor() {}
}

export { UserService };
