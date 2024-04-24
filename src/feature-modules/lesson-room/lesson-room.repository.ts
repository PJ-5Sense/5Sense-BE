import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonRoomEntity } from 'src/feature-modules/lesson-room/entity/lesson-room.entity';
import { CreateCenterRoomDTO } from './dto/request/create-room.dto';
import { UpdateCenterRoomDTO } from './dto/request/update-room.dto';

@Injectable()
export class LessonRoomRepository {
  constructor(
    @InjectRepository(LessonRoomEntity)
    private readonly lessonRoomDAO: Repository<LessonRoomEntity>,
  ) {}
  async addDefaultRoomForNewCenter(centerId: number) {
    return await this.lessonRoomDAO.save({ centerId, name: 'A 룸', capacity: 20 });
  }
  async save(createCenterRoomDTO: CreateCenterRoomDTO, centerId: number) {
    return await this.lessonRoomDAO.save({ ...createCenterRoomDTO, centerId });
  }

  async update(id: number, centerId: number, updateCenterRoomDTO: UpdateCenterRoomDTO) {
    return await this.lessonRoomDAO.update({ id, centerId }, { ...updateCenterRoomDTO });
  }

  async delete(id: number, centerId: number) {
    return await this.lessonRoomDAO.delete({ id, centerId });
  }

  async getMany(startDate: Date, endDate: Date, centerId: number) {
    startDate = new Date(startDate.setHours(0, 0, 0, 0));
    endDate = new Date(endDate.setHours(23, 59, 59, 999));

    return await this.lessonRoomDAO
      .createQueryBuilder('R')
      .select(['R.id', 'R.name', 'R.capacity', 'R.createdDate'])
      .leftJoin('R.durationSchedules', 'DLS', 'DLS.startDate <= :endDate AND DLS.endDate >= :startDate', {
        startDate,
        endDate,
      }) // DLS = durationSchedules(Duration Lesson Schedule)
      .addSelect(['DLS.id', 'DLS.startTime', 'DLS.lessonTime', 'DLS.repeatDate'])
      .leftJoin('DLS.durationLesson', 'DL')
      .addSelect(['DL.id', 'DL.name'])
      .leftJoin('DL.teacher', 'DT') // DT = Duration Teacher
      .addSelect(['DT.id', 'DT.name'])
      .leftJoin('R.sessionSchedules', 'SLS', 'SLS.sessionDate >= :startDate AND SLS.sessionDate <= :endDate', {
        startDate,
        endDate,
      }) // SLS = sessionSchedules(Session Lesson Schedule)
      .addSelect(['SLS.id', 'SLS.startTime'])
      .leftJoin('SLS.sessionRegistration', 'SLR')
      .addSelect(['SLR.id'])
      .leftJoin('SLR.sessionLesson', 'SL')
      .addSelect(['SL.id', 'SL.name', 'SL.lessonTime', 'SL.capacity'])
      .leftJoin('SL.sessionRegistrations', 'lessonSessionRegistrations')
      .addSelect(['lessonSessionRegistrations.id'])
      .leftJoin('SL.teacher', 'ST')
      .addSelect(['ST.id', 'ST.name'])
      .where('R.centerId = :centerId', { centerId })
      .orderBy({ 'R.createdDate': 'ASC' })
      .getMany();
  }
}
