import { CreateCenterDto } from '../dto/request/create-center.dto';
import { CenterEntity } from '../entities/center.entity';
import { Injectable } from '@nestjs/common';
import { ICenterDao } from './center.dao.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CenterDaoImpl implements ICenterDao {
  constructor(@InjectRepository(CenterEntity) private readonly centerRepository: Repository<CenterEntity>) {}

  async create(createCenterDto: CreateCenterDto, userId: number) {
    return await this.centerRepository.save({ ...createCenterDto, userId });
  }

  async findOneByUserId(userId: number) {
    return await this.centerRepository.findOneBy({ userId });
  }

  async findOneMyCenter(userId: number, centerId: number) {
    return await this.centerRepository.findOneBy({ userId, id: centerId });
  }
}
