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
    if (existCenter) throw new InternalServerErrorException('현재는 두개 이상의 센터를 등록 할 수 없습니다.');
    if (userInfo.centerId) throw new InternalServerErrorException('현재는 두개 이상의 센터를 등록 할 수 없습니다.');

    const center = await this.centerDao.create(createCenterDto, userInfo.userId);

    return {
      name: center.name,
      address: center.address,
      mainPhone: center.mainPhone,
    };
  }

  async findOneByUserId(centerId: number) {
    if (!centerId) return null;
    return await this.centerDao.findOneByUserId(centerId);
  }
}
