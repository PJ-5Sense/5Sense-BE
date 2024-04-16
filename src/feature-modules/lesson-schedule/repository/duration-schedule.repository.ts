import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DurationLessonScheduleEntity } from '../entity/duration-lesson-schedule.entity';
import { GetRangeSchedulesDTO } from '../dto/get-range-schedule.dto';
import { LessonRoomEntity } from 'src/feature-modules/lesson-room/entity/lesson-room.entity';

@Injectable()
export class ScheduleRepository {
  constructor(
    @InjectRepository(DurationLessonScheduleEntity)
    private readonly durationScheduleDAO: Repository<DurationLessonScheduleEntity>,
    @InjectRepository(LessonRoomEntity)
    private readonly lessonRoomDAO: Repository<LessonRoomEntity>,
  ) {}

  async getMany(getRangeSchedulesDTO: GetRangeSchedulesDTO, centerId: number) {
    // 기간에 요일에 대한 정보로 가져오기
    // 04/07 데이터베이스에서 기간이 중복된 정보를 가져오지 않는 방법 찾는중
    return await this.lessonRoomDAO
      .createQueryBuilder('room')
      .innerJoinAndSelect('room.durationSchedules', 'durationSchedules')
      .innerJoinAndSelect('room.sessionSchedules', 'sessionSchedules')
      .where('room.centerId = :centerId', { centerId })
      .andWhere(`durationSchedules.startDate BETWEEN :startDate AND :endDate`, {
        startDate: getRangeSchedulesDTO.startDate,
        endDate: getRangeSchedulesDTO.endDate,
      })
      .andWhere(`sessionSchedules.sessionDate BETWEEN :startDate AND :endDate`, {
        startDate: getRangeSchedulesDTO.startDate,
        endDate: getRangeSchedulesDTO.endDate,
      })
      .getMany();
  }
}
