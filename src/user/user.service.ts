import { Inject, Injectable } from '@nestjs/common';
import { CreateUser } from './types/create-user.type';
import { UserEntity } from './entities/user.entity';
import { IUserService } from './user.service.interface';
import { IUserDao, USER_DAO } from './dao/user.dao.interface';

@Injectable()
export class UserServiceImpl implements IUserService {
  constructor(@Inject(USER_DAO) private readonly userDao: IUserDao) {}

  async create(user: CreateUser): Promise<UserEntity> {
    return await this.userDao.create(user);
  }

  async findOneUserCenterByUserId(userId: number) {
    const centerId = (await this.userDao.findOneUserCenterByUserId(userId)).center[0]?.id;
    return centerId ? Number(centerId) : null;
  }
}
