import { CreateAuthDto } from '../types/create-auth.dto';
import { AuthEntity } from '../entities/auth.entity';
import { SocialType } from '../types/social.type';

export interface IAuthDao {
  findOneBySocialId(socialId: string, socialType: SocialType): Promise<AuthEntity>;
  createOrUpdate(socialData: CreateAuthDto): Promise<AuthEntity>;
}

export const AUTH_DAO = Symbol('AUTH_DAO');
