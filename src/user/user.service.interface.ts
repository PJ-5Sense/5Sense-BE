import { SocialType } from 'src/auth/types/social.type';
import { UserEntity } from './entities/user.entity';
import { CreateUser } from './dto/create-user.dto';

// social-login-strategy.interface.ts
export interface IUserService {
  create(user: CreateUser): Promise<UserEntity>;
  findOneBySocialId(socialId: string, socialType: SocialType): Promise<UserEntity>;
}

export const USER_SERVICE = Symbol('USER_SERVICE');
