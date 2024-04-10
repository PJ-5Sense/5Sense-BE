import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './entity/auth.entity';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './type/create-auth.dto';

@Injectable()
export class AuthRepository {
  constructor(@InjectRepository(AuthEntity) private readonly authDAO: Repository<AuthEntity>) {}

  async createOrUpdate(socialData: CreateAuthDto) {
    return await this.authDAO.save(socialData);
  }

  async findOneByUserAgent(userId: number, userAgent: string) {
    return await this.authDAO.findOne({ where: { userId: userId, userAgent } });
  }
}
