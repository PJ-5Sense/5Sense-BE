import { CreateCenterDTO } from './dto/request/create-center.dto';
import { CenterEntity } from './entity/center.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtPayload } from '../auth/type/jwt-payload.type';
import { UpdateCenterDTO } from './dto/request/update-center.dto';

@Injectable()
export class CenterRepository {
  constructor(@InjectRepository(CenterEntity) private readonly centerDAO: Repository<CenterEntity>) {}

  async create(createCenterDto: CreateCenterDTO, userId: number, profile: string) {
    return await this.centerDAO.save({ ...createCenterDto, userId, profile });
  }

  async findOneByUserId(userId: number) {
    return await this.centerDAO.findOneBy({ userId });
  }

  async findOneMyCenter(userId: number, centerId: number) {
    return await this.centerDAO.findOneBy({ userId, id: centerId });
  }

  async updateCenter(s3URL: string | null, updateCenterDto: UpdateCenterDTO, userInfo: JwtPayload) {
    const result = await this.centerDAO.update(userInfo.centerId, {
      ...updateCenterDto,
      ...(s3URL && { profile: s3URL }),
    });

    if (result.affected) {
      const updatedCenter = await this.centerDAO.findOneBy({ id: userInfo.centerId });
      return updatedCenter;
    }

    throw new InternalServerErrorException('센터 정보 업데이트에 실패했습니다.');
  }
}
