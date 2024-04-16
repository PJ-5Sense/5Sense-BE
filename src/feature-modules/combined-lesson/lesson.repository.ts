import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionLessonEntity } from './entity/session-lesson.entity';
import { LessonViewEntity } from './entity/lesson-view.entity';
import { FindManyByFilterDTO } from './dto/request/find-many-lesson.dto';
import { DurationLessonEntity } from '../duration-lesson/duration-lesson.entity';

@Injectable()
export class LessonRepository {
  constructor(
    @InjectRepository(DurationLessonEntity) private readonly durationLessonDAO: Repository<DurationLessonEntity>,
    @InjectRepository(SessionLessonEntity) private readonly sessionLessonDAO: Repository<SessionLessonEntity>,

    @InjectRepository(LessonViewEntity) private readonly lessonViewDAO: Repository<LessonViewEntity>,
  ) {}

  async findManyLessonByDate(
    startDate: Date,
    endDate: Date,
    centerId: number,
  ): Promise<[DurationLessonEntity[], SessionLessonEntity[]]> {
    const durationLessons = await this.durationLessonDAO
      .createQueryBuilder('L') // L = duration lesson
      .select(['L.id', 'L.name', 'L.memo'])
      .innerJoin('L.durationSchedules', 'D_S') // D_S = schedule
      .addSelect(['D_S.startDate', 'D_S.endDate', 'D_S.startTime', 'D_S.repeatDate', 'D_S.lessonTime'])
      .innerJoin('D_S.lessonRoom', 'L_R') // L_R = lesson room
      .addSelect(['L_R.id', 'L_R.name'])
      .innerJoin('L.teacher', 'T') // T = teacher
      .addSelect(['T.id', 'T.name'])
      .innerJoin('L.durationRegistrations', 'D_R') // D_R = duration lesson registration, 학생 수 계산하기 위해서 가져오기
      .addSelect(['D_R.id'])
      .where('L.centerId = :centerId', { centerId })
      .andWhere('D_S.startDate <= :endDate AND D_S.endDate >= :startDate', { startDate, endDate })
      .getMany();

    const sessionLessons = await this.sessionLessonDAO
      .createQueryBuilder('L') // L = session lesson
      .select(['L.id', 'L.name', 'L.memo', 'L.lessonTime'])
      .innerJoin('L.teacher', 'T') // T = teacher
      .addSelect(['T.id', 'T.name'])
      .innerJoin('L.sessionRegistrations', 'S_R') // S_R = session registration
      .addSelect(['S_R.id'])
      .innerJoin('S_R.sessionSchedules', 'S_S') // S_S = session schedule
      .addSelect(['S_S.sessionDate', 'S_S.startTime'])
      .innerJoin('S_S.lessonRoom', 'L_R') // L_R = lesson room
      .addSelect(['L_R.id', 'L_R.name'])
      .where('L.centerId = :centerId', { centerId })
      .andWhere('S_S.sessionDate <= :endDate AND S_S.sessionDate >= :startDate', {
        startDate,
        endDate,
      })
      .getMany();

    return [durationLessons, sessionLessons];
  }

  async findManyLessonByFilter(findManyByFilterDTO: FindManyByFilterDTO, centerId: number) {
    const { type, teachers, categories } = findManyByFilterDTO;

    const queryBuilder = this.lessonViewDAO
      .createQueryBuilder('L')
      .where('L.centerId = :centerId', { centerId })
      .select(['L.id', 'L.name', 'L.type', 'L.name', 'L.teacher', 'L.category', 'L.numberOfStudents', 'L.createdDate']);

    if (type !== 'all') {
      queryBuilder.andWhere('L.type = :type', { type });
    }

    if (teachers.length > 0) {
      queryBuilder.andWhere('L.teacherId IN (:teachers)', { teachers });
    }

    if (categories.length > 0) {
      queryBuilder.andWhere('L.categoryId IN (:categories)', { categories });
    }

    return await queryBuilder
      .offset(findManyByFilterDTO.getSkip())
      .limit(findManyByFilterDTO.getTake())
      .orderBy(`L.createdDate`, 'DESC')
      .getManyAndCount();
  }
}
