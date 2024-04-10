import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUser } from './type/create-user.type';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(UserEntity) private readonly userDAO: Repository<UserEntity>) {}

  async create(user: CreateUser): Promise<UserEntity> {
    const newUser = this.userDAO.create(user);
    await this.userDAO.insert(newUser);
    return newUser;
  }

  async findOneById(userId: number) {
    const user = await this.userDAO.findOne({ where: { id: userId }, relations: { socials: true, centers: true } });

    return user ?? null;
  }

  async delete(userId: number) {
    const result = await this.userDAO.delete({ id: userId });

    return result.affected;
  }
}
