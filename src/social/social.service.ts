import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialEntity } from './entities/social.entity';
import { Repository } from 'typeorm';
import { SocialType } from 'src/auth/types/social.type';
import { CreateSocial } from '../user/types/create-user.type';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class SocialService {
  constructor(@InjectRepository(SocialEntity) private readonly socialRepository: Repository<SocialEntity>) {}

  async findOneByUser(socialId: string, socialType: SocialType) {
    const user = await this.socialRepository
      .createQueryBuilder('social')
      .leftJoinAndSelect('social.user', 'user')
      .where('social.socialId = :socialId', { socialId })
      .andWhere('social.socialType = :socialType', { socialType })
      .getOne();

    return user ? user.user : null;
  }

  async create(social: CreateSocial, savedUser: UserEntity) {
    const newSocial = this.socialRepository.create({
      ...social,
      user: savedUser,
    });

    await this.socialRepository.save(newSocial);
  }
}