import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialType } from 'src/auth/types/social.type';
import { CreateUser } from '../types/create-user.type';

@Injectable()
export class UserDao {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async create(user: CreateUser): Promise<UserEntity> {
    const newUser = this.userRepository.create(user);
    await this.userRepository.insert(newUser);
    return newUser;
  }

  async findOneBySocialId(socialId: string, socialType: SocialType) {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.social', 'social')
      .where('user.socialId = :socialId', { socialId })
      .andWhere('social.socialType = :socialType', { socialType })
      .getOne();
  }
}
