import { DurationLessonDTO, SessionLessonDTO } from './dto/create-lesson.dto';
import { Injectable } from '@nestjs/common';
import { DurationLessonEntity } from './entities/duration-lesson.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DurationLessonScheduleEntity } from 'src/lesson-schedule/entities/duration-lesson-schedule.entity';
import { SessionLessonEntity } from './entities/session-lesson.entity';
import { LessonViewEntity } from './entities/lesson-view.entity';
import { FindManyByFilterDTO } from './dto/find-many-lesson.dto';
import { LessonType } from './types/lesson.type';

@Injectable()
export class LessonRepository {
  constructor(
    @InjectRepository(DurationLessonEntity) private readonly durationLessonDAO: Repository<DurationLessonEntity>,
    @InjectRepository(SessionLessonEntity) private readonly sessionLessonDAO: Repository<SessionLessonEntity>,
    @InjectRepository(DurationLessonScheduleEntity)
    private readonly durationScheduleDAO: Repository<DurationLessonScheduleEntity>,
    @InjectRepository(LessonViewEntity) private readonly lessonViewDAO: Repository<LessonViewEntity>,
  ) {}

  /**
   * 기간반의 경우, 신규 기간반(레슨) 등록과 기간반 일정을 등록을 진행함
   * @param {DurationLessonDTO} durationLesson
   * @param {number} centerId
   */
  async createDurationLesson(durationLesson: DurationLessonDTO, centerId: number) {
    const { schedules, ...lessonData } = durationLesson;

    const newLesson = await this.durationLessonDAO.save(
      this.durationLessonDAO.create({
        ...lessonData,
        centerId,
      }),
    );

    for (const schedule of schedules) {
      await this.durationScheduleDAO.save(
        this.durationScheduleDAO.create({
          ...schedule,
          durationLesson: newLesson,
        }),
      );
    }
  }

  /**
   * 회차반은 신규 회차반(레슨)만 등록함
   * @param {SessionLessonDTO} sessionLesson
   * @param {number} centerId
   */
  async createSessionLesson(sessionLesson: SessionLessonDTO, centerId: number) {
    await this.sessionLessonDAO.save(
      this.sessionLessonDAO.create({
        ...sessionLesson,
        centerId,
      }),
    );
  }

  async findManyLessonByDate(
    startDate: Date,
    endDate: Date,
    centerId: number,
  ): Promise<[DurationLessonEntity[], SessionLessonEntity[]]> {
    const durationLessons = await this.durationLessonDAO
      .createQueryBuilder('L') // L = duration lesson
      .select(['L.id', 'L.name', 'L.memo', 'L.lessonTime'])
      .innerJoin('L.durationSchedules', 'D_S') // D_S = schedule
      .addSelect(['D_S.startDate', 'D_S.endDate', 'D_S.startTime', 'D_S.repeatDate'])
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

  async findOneDetails(id: number, centerId: number, type: LessonType) {
    if (type === LessonType.DURATION) {
      return await this.durationLessonDAO
        .createQueryBuilder('L')
        .select(['L.id', 'L.name', 'L.memo'])
        .innerJoin('L.durationRegistrations', 'D_R')
        .addSelect(['D_R.id', 'D_R.student'])
        .innerJoin('D_R.student', 'S')
        .addSelect(['S.name', 'S.phone'])
        .innerJoin('L.durationSchedules', 'D_S')
        .addSelect(['D_S.startDate', 'D_S.endDate', 'D_S.startTime', 'D_S.endTime', 'D_S.repeatDate'])
        .innerJoin('L.teacher', 'T')
        .addSelect(['T.name'])
        .innerJoin('L.category', 'C')
        .addSelect(['C.name'])
        .where('L.id = :id', { id })
        .andWhere('L.centerId = :centerId', { centerId })
        .getOne();
    }

    if (type === LessonType.SESSION) {
      return await this.sessionLessonDAO
        .createQueryBuilder('L')
        .select(['L.id', 'L.name', 'L.memo', 'L.totalSessions'])
        .innerJoin('L.sessionRegistrations', 'S_R')
        .addSelect(['S_R.id', 'S_R.student'])
        .innerJoin('S_R.student', 'S')
        .addSelect(['S.name', 'S.phone'])
        .innerJoin('S_R.sessionSchedules', 'S_S')
        .addSelect(['S_S.id'])
        .innerJoin('L.teacher', 'T')
        .addSelect(['T.name'])
        .innerJoin('L.category', 'C')
        .addSelect(['C.name'])
        .where('L.id = :id', { id })
        .andWhere('L.centerId = :centerId', { centerId })
        .getOne();
    }
  }
}
