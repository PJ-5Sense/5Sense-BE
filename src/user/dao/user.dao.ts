import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUser } from '../types/create-user.type';
import { IUserDao } from './user.dao.interface';

@Injectable()
export class UserDAOImpl implements IUserDao {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async create(user: CreateUser): Promise<UserEntity> {
    const newUser = this.userRepository.create(user);
    await this.userRepository.insert(newUser);
    return newUser;
  }

  async findOne(userId: number) {
    return await this.userRepository.findOne({ where: { id: userId }, relations: { social: true, center: true } });
  }
}
