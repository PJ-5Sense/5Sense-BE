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
    startDate = new Date(startDate.setHours(0, 0, 0));
    endDate = new Date(endDate.setHours(23, 59, 59));

    return await this.lessonRoomDAO
      .createQueryBuilder('room')
      .select(['room.id', 'room.name', 'room.capacity'])
      .leftJoin('room.durationSchedules', 'durationSchedules')
      .addSelect(['durationSchedules.id', 'durationSchedules.startTime', 'durationSchedules.lessonTime'])
      .leftJoin('durationSchedules.durationLesson', 'durationLesson')
      .addSelect(['durationLesson.id', 'durationLesson.name'])
      .leftJoin('durationLesson.teacher', 'durationLessonTeacher')
      .addSelect(['durationLessonTeacher.id', 'durationLessonTeacher.name'])
      .leftJoin('room.sessionSchedules', 'sessionSchedules')
      .addSelect(['sessionSchedules.id', 'sessionSchedules.startTime'])
      .leftJoin('sessionSchedules.sessionRegistration', 'sessionRegistration')
      .addSelect(['sessionRegistration.id'])
      .leftJoin('sessionRegistration.sessionLesson', 'sessionLesson')
      .addSelect(['sessionLesson.id', 'sessionLesson.name', 'sessionLesson.lessonTime', 'sessionLesson.capacity'])
      .leftJoin('sessionLesson.sessionRegistrations', 'lessonSessionRegistrations')
      .addSelect(['lessonSessionRegistrations.id'])
      .leftJoin('sessionLesson.teacher', 'sessionLessonTeacher')
      .addSelect(['sessionLessonTeacher.id', 'sessionLessonTeacher.name'])
      .where('room.centerId = :centerId', { centerId })
      .andWhere('sessionSchedules.sessionDate >= :startDate', { startDate })
      .andWhere('sessionSchedules.sessionDate <= :endDate', { endDate })
      .andWhere('durationSchedules.startDate <= :startDate', { startDate })
      .andWhere('durationSchedules.endDate >= :endDate', { endDate })
      .orderBy({ 'durationSchedules.startTime': 'ASC', 'sessionSchedules.startTime': 'ASC' })
      .getMany();
  }
}
