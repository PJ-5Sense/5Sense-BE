import { CreateCenterDto } from './dto/request/create-center.dto';
import { CenterEntity } from './entity/center.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CenterRepository {
  constructor(@InjectRepository(CenterEntity) private readonly centerDAO: Repository<CenterEntity>) {}

  async create(createCenterDto: CreateCenterDto, userId: number) {
    return await this.centerDAO.save({ ...createCenterDto, userId });
  }

  async findOneByUserId(userId: number) {
    return await this.centerDAO.findOneBy({ userId });
  }

  async findOneMyCenter(userId: number, centerId: number) {
    return await this.centerDAO.findOneBy({ userId, id: centerId });
  }
}
