import { Injectable } from '@nestjs/common';
import { SessionLessonRepository } from './session-lesson.repository';
import { SessionLessonDTO } from '../combined-lesson/dto/request/create-session-lesson.dto';
import { LessonCategoryService } from '../lesson-category/category.service';

@Injectable()
export class SessionLessonService {
  constructor(
    private readonly sessionLessonRepository: SessionLessonRepository,
    private readonly lessonCategoryService: LessonCategoryService,
  ) {}

  async createSessionLesson(sessionLessonDTO: SessionLessonDTO, centerId: number) {
    if (!sessionLessonDTO.category.id) {
      sessionLessonDTO.category.id = await this.lessonCategoryService.processEtceteraCategory(
        sessionLessonDTO.category.name,
      );
      return await this.sessionLessonRepository.createSessionLesson(sessionLessonDTO, centerId);
    }
  }
}
