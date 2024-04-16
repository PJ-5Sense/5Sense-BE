import { Injectable, NotFoundException } from '@nestjs/common';
import { SessionLessonEntity } from '../combined-lesson/entity/session-lesson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSessionLessonDTO } from './dto/request/create-session-lesson.dto';
import { UpdateSessionLessonDTO } from './dto/request/update-session-lesson.dto';

@Injectable()
export class SessionLessonRepository {
  constructor(
    @InjectRepository(SessionLessonEntity)
    private readonly sessionLessonDAO: Repository<SessionLessonEntity>,
  ) {}
  /**
   *
   * 회차반 데이터를 생성함
   * @param {CreateSessionLessonDTO} sessionLesson
   * @param {number} centerId
   */
  async create(sessionLesson: CreateSessionLessonDTO, centerId: number) {
    const { category, ...lessonData } = sessionLesson;

    await this.sessionLessonDAO.save(
      this.sessionLessonDAO.create({
        ...lessonData,
        centerId,
        categoryId: category.id,
      }),
    );
  }

  async getOne(id: number, centerId: number) {
    const lesson = await this.sessionLessonDAO
      .createQueryBuilder('L')
      .select(['L.id', 'L.name', 'L.memo', 'L.totalSessions', 'L.lessonTime', 'L.tuitionFee', 'L.capacity'])
      .leftJoin('L.sessionRegistrations', 'S_R')
      .addSelect(['S_R.id', 'S_R.student'])
      .leftJoin('S_R.student', 'S')
      .addSelect(['S.name', 'S.phone'])
      .leftJoin('S_R.sessionSchedules', 'S_S')
      .addSelect(['S_S.id'])
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

  async update(lessonId: number, updateSessionLessonDTO: UpdateSessionLessonDTO, centerId: number) {
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
}
