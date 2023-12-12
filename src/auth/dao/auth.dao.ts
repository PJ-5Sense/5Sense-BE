import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from '../entities/auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthDao {
  constructor(@InjectRepository(AuthEntity) private readonly authRepository: Repository<AuthEntity>) {}

  async findOneBySocialId(socialId: string) {
    return await this.authRepository.findOne({ where: { socialId }, relations: ['user'] });
  }

  async save(saveDto: {
    socialId: number;
    socialType: SocialLoginType;
    socialAccessToken: string;
    socialRefreshToken: string;
    appRefreshToken: string;
  }) {}
}
