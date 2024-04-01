import { SessionLessonDTO } from './dto/create-lesson.dto';
import { Injectable } from '@nestjs/common';
import { DurationLessonEntity } from './entity/duration/duration-lesson.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionLessonEntity } from './entity/session/session-lesson.entity';
import { LessonViewEntity } from './entity/lesson-view.entity';
import { FindManyByFilterDTO } from './dto/find-many-lesson.dto';
import { UpdateSessionLessonDTO } from './dto/update-lesson.dto';

@Injectable()
export class LessonRepository {
  constructor(
    @InjectRepository(DurationLessonEntity) private readonly durationLessonDAO: Repository<DurationLessonEntity>,
    @InjectRepository(SessionLessonEntity) private readonly sessionLessonDAO: Repository<SessionLessonEntity>,

    @InjectRepository(LessonViewEntity) private readonly lessonViewDAO: Repository<LessonViewEntity>,
  ) {}

  ////////////////////////////////////////////////////////////////////
  //                      Duration Lesson                           //
  ////////////////////////////////////////////////////////////////////

  /**
   * 기간반 데이터를 생성하며 생성된 ID(PK)를 반환함
   * @param {} durationLesson
   * @param {number} centerId
   */
  async createDurationLesson(durationLesson: {
    name: string;
    memo: string;
    lessonTime: number;
    tuitionFee: number;
    teacherId: number;
    categoryId: number;
    centerId: number;
  }) {
    const { id } = await this.durationLessonDAO.save(this.durationLessonDAO.create({ ...durationLesson }));

    return id;
  }

  async findOneDurationDetails(id: number, centerId: number) {
    return await this.durationLessonDAO
      .createQueryBuilder('L')
      .select(['L.id', 'L.name', 'L.memo', 'L.createdDate'])
      .leftJoin('L.durationRegistrations', 'D_R')
      .addSelect(['D_R.id', 'D_R.student'])
      .leftJoin('D_R.student', 'S', 'S.id = D_R.studentId')
      .addSelect(['S.id', 'S.name', 'S.phone'])
      .innerJoin('L.durationSchedules', 'D_S')
      .addSelect(['D_S.id', 'D_S.startDate', 'D_S.endDate', 'D_S.startTime', 'D_S.endTime', 'D_S.repeatDate'])
      .innerJoin('D_S.lessonRoom', 'L_R')
      .addSelect(['L_R.id', 'L_R.name'])
      .innerJoin('L.teacher', 'T')
      .addSelect(['T.name'])
      .innerJoin('L.category', 'C')
      .addSelect(['C.id', 'C.name', 'C.parentId', 'C.parentName'])
      .where('L.id = :id', { id })
      .andWhere('L.centerId = :centerId', { centerId })
      .getOne();
  }

  async updateDurationLesson(
    lessonId: number,
    durationLesson: {
      name: string;
      memo: string;
      lessonTime: number;
      tuitionFee: number;
      teacherId: number;
      categoryId: number;
      centerId: number;
    },
  ) {
    // TODO : 트랜잭션 이용하여 작업 처리하기, 성공 실패 여부 반환하기, 수정이 안되었을 경우 각 내용에 따른 에러 처리하기

    await this.durationLessonDAO
      .createQueryBuilder()
      .update()
      .set({ ...durationLesson })
      .where('id = :lessonId', { lessonId })
      .andWhere('centerId = :centerId', { centerId: durationLesson.categoryId })
      .execute();
  }

  async closeDurationLesson(lessonId: number, centerId: number) {
    await this.durationLessonDAO
      .createQueryBuilder()
      .update()
      .set({ isClosed: true })
      .where('id = :lessonId', { lessonId })
      .andWhere('centerId = :centerId', { centerId })
      .execute();
  }

  ////////////////////////////////////////////////////////////////////
  //                      Session Lesson                            //
  ////////////////////////////////////////////////////////////////////
  /**
   *
   * 회차반 데이터를 생성함
   * @param {SessionLessonDTO} sessionLesson
   * @param {number} centerId
   */
  async createSessionLesson(sessionLesson: SessionLessonDTO, centerId: number) {
    const { category, ...lessonData } = sessionLesson;

    await this.sessionLessonDAO.save(
      this.sessionLessonDAO.create({
        ...lessonData,
        centerId,
        categoryId: category.id,
      }),
    );
  }

  async findOneSessionDetails(id: number, centerId: number) {
    return await this.sessionLessonDAO
      .createQueryBuilder('L')
      .select(['L.id', 'L.name', 'L.memo', 'L.totalSessions', 'L.lessonTime', 'L.tuitionFee', 'L.capacity'])
      .leftJoin('L.sessionRegistrations', 'S_R')
      .addSelect(['S_R.id', 'S_R.student'])
      .leftJoin('S_R.student', 'S')
      .addSelect(['S.name', 'S.phone'])
      .leftJoin('S_R.sessionSchedules', 'S_S')
      .addSelect(['S_S.id'])
      .innerJoin('L.teacher', 'T')
      .addSelect(['T.name'])
      .innerJoin('L.category', 'C')
      .addSelect(['C.id', 'C.name', 'C.parentId', 'C.parentName'])
      .where('L.id = :id', { id })
      .andWhere('L.centerId = :centerId', { centerId })
      .getOne();
  }

  async updateSessionLesson(lessonId: number, updateSessionLessonDTO: UpdateSessionLessonDTO, centerId: number) {
    // TODO : 성공 여부 리턴하기, 토탈 세션을 바꿀 수 있는지 없는지 확인하기(바뀌면 안됨)
    // TODO : 회의에서 회차반  수정은 어디까지 인지 정해야함
    await this.sessionLessonDAO
      .createQueryBuilder()
      .update()
      .set({ ...updateSessionLessonDTO })
      .where('id = :lessonId', { lessonId })
      .andWhere('centerId = :centerId', { centerId })
      .execute();
  }

  async closeSessionLesson(lessonId: number, centerId: number) {
    await this.sessionLessonDAO
      .createQueryBuilder()
      .update()
      .set({ isClosed: true })
      .where('id = :lessonId', { lessonId })
      .andWhere('centerId = :centerId', { centerId })
      .execute();
  }

  ////////////////////////////////////////////////////////////////////
  //                      ALL Lesson                                //
  ////////////////////////////////////////////////////////////////////
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
