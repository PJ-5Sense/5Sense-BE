import { Inject, Injectable } from '@nestjs/common';
import { CreateSocial, CreateUser } from './types/create-user.type';
import { UserEntity } from './entities/user.entity';
import { IUserService } from './user.service.interface';
import { IUserDao, USER_DAO } from './dao/user.dao.interface';
import { SocialService } from '../social/social.service';
import { SocialType } from 'src/auth/types/social.type';

@Injectable()
export class UserServiceImpl implements IUserService {
  constructor(@Inject(USER_DAO) private readonly userDao: IUserDao, private readonly socialService: SocialService) {}

  async createUser(user: CreateUser, social: CreateSocial): Promise<UserEntity> {
    const savedUser = await this.userDao.create(user);

    await this.socialService.create(social, savedUser);
    return savedUser;
  }

  async findUserBySocialId(socialId: string, socialType: SocialType): Promise<UserEntity | null> {
    const user = await this.socialService.findOneByUser(socialId, socialType);

    if (user) {
      return await this.userDao.findOne(user.id);
    }

    return null;
  }

  async findOne(userId: number) {
    return await this.userDao.findOne(userId);
  }
}
