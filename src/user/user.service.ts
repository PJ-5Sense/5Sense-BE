import { Inject, Injectable } from '@nestjs/common';
import { SocialType } from 'src/auth/types/social.type';
import { CreateUser } from './types/create-user.type';
import { UserEntity } from './entities/user.entity';
import { IUserService } from './user.service.interface';
import { IUserDao, USER_DAO } from './dao/user.dao.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject(USER_DAO) private readonly userDao: IUserDao) {}
  /**
   * 유저 정보를 성공적으로 삽입하면 UserEntity를 리턴함
   * (UserEntity를 Controller의 Response로 사용하지 않도록 주의 및 확인 필요)
   *
   * @param user
   * @returns UserEntity
   */
  async create(user: CreateUser): Promise<UserEntity> {
    return await this.userDao.create(user);
  }

  /**
   * UserEntity를 Controller의 Response로 사용하지 않도록 주의 및 확인 필요
   *
   * @param socialId
   * @param socialType
   * @returns UserEntity
   */
  async findOneBySocialId(socialId: string, socialType: SocialType) {
    return await this.userDao.findOneBySocialId(socialId, socialType);
  }
}
