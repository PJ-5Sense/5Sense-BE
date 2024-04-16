import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DurationLessonEntity } from './duration-lesson.entity';
import { Repository } from 'typeorm';
import { DurationLessonScheduleEntity } from '../lesson-schedule/entity/duration-lesson-schedule.entity';
import { DurationScheduleDTO } from './dto/request/create-duration-lesson.dto';
import { UpdateDurationScheduleDTO } from './dto/request/update-duration-lesson-dto';

@Injectable()
export class DurationLessonRepository {
  constructor(
    @InjectRepository(DurationLessonEntity)
    private readonly durationLessonDAO: Repository<DurationLessonEntity>,

    @InjectRepository(DurationLessonScheduleEntity)
    private readonly durationScheduleDAO: Repository<DurationLessonScheduleEntity>,
  ) {}

  /**
   *
   * 기간반 추가와 함께 기간반 일정을 같이 추가함
   * @param durationLesson
   * @param schedules
   */
  async create(
    durationLesson: {
      name: string;
      memo: string;
      tuitionFee: number;
      teacherId: number;
      categoryId: number;
      centerId: number;
    },
    schedules: DurationScheduleDTO[],
  ) {
    const { id } = await this.durationLessonDAO.save(this.durationLessonDAO.create({ ...durationLesson }));

    for (const schedule of schedules) {
      await this.durationScheduleDAO.save(
        this.durationScheduleDAO.create({
          ...schedule,
          lessonId: id,
        }),
      );
    }
  }

  async getOne(id: number, centerId: number) {
    const lesson = await this.durationLessonDAO
      .createQueryBuilder('L')
      .select(['L.id', 'L.name', 'L.memo', 'L.tuitionFee'])
      .leftJoin('L.durationRegistrations', 'D_R')
      .addSelect(['D_R.id', 'D_R.student'])
      .leftJoin('D_R.student', 'S', 'S.id = D_R.studentId')
      .addSelect(['S.id', 'S.name', 'S.phone'])
      .innerJoin('L.durationSchedules', 'D_S')
      .addSelect(['D_S.id', 'D_S.startDate', 'D_S.endDate', 'D_S.startTime', 'D_S.endTime', 'D_S.repeatDate'])
      .innerJoin('D_S.lessonRoom', 'L_R')
      .addSelect(['L_R.id', 'L_R.name'])
      .innerJoin('L.teacher', 'T')
      .addSelect(['T.id', 'T.name'])
      .innerJoin('L.category', 'C')
      .addSelect(['C.id', 'C.name', 'C.parentId', 'C.parentName'])
      .where('L.id = :id', { id })
      .andWhere('L.centerId = :centerId', { centerId })
      .getOne();

    if (!lesson) {
      throw new NotFoundException('존재하지 않는 클래스입니다.');
    }

    return lesson;
  }

  async update(
    lessonId: number,
    durationLesson: {
      name: string;
      memo: string;
      tuitionFee: number;
      teacherId: number;
      categoryId: number;
      centerId: number;
    },
    schedules: UpdateDurationScheduleDTO[],
  ) {
    // TODO : 트랜잭션 이용하여 작업 처리하기, 성공 실패 여부 반환하기, 수정이 안되었을 경우 각 내용에 따른 에러 처리하기
    await this.durationLessonDAO
      .createQueryBuilder()
      .update()
      .set({ ...durationLesson })
      .where('id = :lessonId', { lessonId })
      .andWhere('centerId = :centerId', { centerId: durationLesson.categoryId })
      .execute();

    schedules.forEach(async schedule => {
      const { id, ...scheduleData } = schedule;
      await this.durationScheduleDAO
        .createQueryBuilder()
        .update()
        .set({ ...scheduleData })
        .where('id = :id', { id })
        .andWhere('lessonId = :lessonId', { lessonId })
        .execute();
    });
  }

  async closeLesson(lessonId: number, centerId: number) {
    await this.durationLessonDAO
      .createQueryBuilder()
      .update()
      .set({ isClosed: true })
      .where('id = :lessonId', { lessonId })
      .andWhere('centerId = :centerId', { centerId })
      .execute();
  }
}
