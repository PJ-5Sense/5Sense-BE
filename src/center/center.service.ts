import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCenterDto } from './dto/request/create-center.dto';
import { ICenterService } from './center.service.interface';
import { CENTER_DAO, ICenterDao } from './dao/center.dao.interface';
import { JwtPayload } from 'src/auth/types/jwt-payload.type';
import { LessonRoomService } from 'src/lesson-room/lesson-room.service';

@Injectable()
export class CenterServiceImpl implements ICenterService {
  constructor(
    @Inject(CENTER_DAO) private readonly centerDao: ICenterDao,
    private readonly lessonRoomService: LessonRoomService,
  ) {}
  async create(createCenterDto: CreateCenterDto, userInfo: JwtPayload) {
    const existCenter = await this.findOneByUserId(userInfo.userId);

    if (existCenter) throw new InternalServerErrorException('More than one center cannot be registered at this time');
    if (userInfo.centerId)
      throw new InternalServerErrorException('More than one center cannot be registered at this time');

    const center = await this.centerDao.create(createCenterDto, userInfo.userId);

    //  센터 등록 시, 1개의 룸 추가 필요함(리팩토링 필요함)
    await this.lessonRoomService.addDefaultRoomForNewCenter(center.id);

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
