import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUser } from '../types/create-user.type';

@Injectable()
export class UserDao {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async create(user: CreateUser): Promise<UserEntity> {
    const newUser = this.userRepository.create(user);
    await this.userRepository.insert(newUser);
    return newUser;
  }

  async findOneUserCenterByUserId(userId: number) {
    return await this.userRepository.findOne({ where: { id: userId }, relations: { center: true } });
  }
}
