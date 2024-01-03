import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCenterDto } from './dto/request/create-center.dto';
import { ICenterService } from './center.service.interface';
import { CENTER_DAO, ICenterDao } from './dao/center.dao.interface';
import { JwtPayload } from 'src/auth/types/jwt-payload.type';

@Injectable()
export class CenterServiceImpl implements ICenterService {
  constructor(@Inject(CENTER_DAO) private readonly centerDao: ICenterDao) {}
  async create(createCenterDto: CreateCenterDto, userInfo: JwtPayload) {
    const existCenter = await this.findOneByUserId(userInfo.userId);

    if (existCenter) throw new InternalServerErrorException('More than one center cannot be registered at this time');
    if (userInfo.centerId)
      throw new InternalServerErrorException('More than one center cannot be registered at this time');

    const center = await this.centerDao.create(createCenterDto, userInfo.userId);

    return {
      name: center.name,
      address: center.address,
      mainPhone: center.mainPhone,
    };
  }

  async findOneByUserId(userId: number) {
    if (!userId) return null;
    return await this.centerDao.findOneByUserId(userId);
  }

  async findOneMyCenter(userId: number, centerId: number) {
    const myCenter = await this.centerDao.findOneMyCenter(userId, centerId);

    return {
      name: myCenter.name,
      address: myCenter.address,
      mainPhone: myCenter.mainPhone,
    };
  }
}
