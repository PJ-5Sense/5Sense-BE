import { Injectable } from '@nestjs/common';
import { SessionLessonEntity } from '../combined-lesson/entity/session-lesson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionLessonDTO } from '../combined-lesson/dto/request/create-session-lesson.dto';

@Injectable()
export class SessionLessonRepository {
  constructor(
    @InjectRepository(SessionLessonEntity)
    private readonly sessionLessonDAO: Repository<SessionLessonEntity>,
  ) {}
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
}
