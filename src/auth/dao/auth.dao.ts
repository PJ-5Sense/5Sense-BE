import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from '../entities/auth.entity';
import { Repository } from 'typeorm';
import { CreateAuthDto } from '../types/create-auth.dto';
import { IAuthDao } from './auth.dao.interface';

@Injectable()
export class AuthDao implements IAuthDao {
  constructor(@InjectRepository(AuthEntity) private readonly authRepository: Repository<AuthEntity>) {}

  async createOrUpdate(socialData: CreateAuthDto) {
    return await this.authRepository.save(socialData);
  }

  async findOneByUserAgent(userId: number, userAgent: string) {
    return await this.authRepository.findOne({ where: { userId: userId, userAgent } });
  }
}
