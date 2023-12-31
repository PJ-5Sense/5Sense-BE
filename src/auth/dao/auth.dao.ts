import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from '../entities/auth.entity';
import { Repository } from 'typeorm';
import { CreateAuthDto } from '../types/create-auth.dto';
import { SocialType } from '../types/social.type';
import { IAuthDao } from './auth.dao.interface';

@Injectable()
export class AuthDao implements IAuthDao {
  constructor(@InjectRepository(AuthEntity) private readonly authRepository: Repository<AuthEntity>) {}

  async findOneBySocialId(socialId: string, socialType: SocialType, userAgent: string) {
    return await this.authRepository.findOne({ where: { socialId, socialType, userAgent }, relations: ['user'] });
  }

  async createOrUpdate(socialData: CreateAuthDto) {
    return await this.authRepository.save(socialData);
  }
}
