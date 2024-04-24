import { Injectable } from '@nestjs/common';
import { SessionLessonRepository } from './session-lesson.repository';
import { LessonCategoryService } from '../lesson-category/category.service';
import { UpdateSessionLessonDTO } from './dto/request/update-session-lesson.dto';
import { CreateSessionLessonDTO } from './dto/request/create-session-lesson.dto';
import { ResponseGetDetailSessionLessonDTO } from './dto/response/get-detail-lesson.dto';
import { ResponseFindManySessionLessonDTO } from './dto/response/find-many-lesson.dto';

@Injectable()
export class SessionLessonService {
  constructor(
    private readonly sessionLessonRepository: SessionLessonRepository,
    private readonly lessonCategoryService: LessonCategoryService,
  ) {}

  async create(sessionLessonDTO: CreateSessionLessonDTO, centerId: number) {
    if (!sessionLessonDTO.category.id) {
      sessionLessonDTO.category.id = await this.lessonCategoryService.processEtceteraCategory(
        sessionLessonDTO.category.name,
      );
      return await this.sessionLessonRepository.create(sessionLessonDTO, centerId);
    }
  }

  async findMany(centerId: number) {
    const lessons = await this.sessionLessonRepository.findMany(centerId);
    return lessons.map(lesson => new ResponseFindManySessionLessonDTO(lesson));
  }

  async getOne(id: number, centerId: number) {
    const lesson = await this.sessionLessonRepository.getOne(id, centerId);

    return new ResponseGetDetailSessionLessonDTO(lesson);
  }

  async update(updateSessionLessonDTO: UpdateSessionLessonDTO, lessonId: number, centerId: number) {
    await this.sessionLessonRepository.update(lessonId, updateSessionLessonDTO, centerId);
  }

  async closeLesson(lessonId: number, centerId: number) {
    return await this.sessionLessonRepository.closeSessionLesson(lessonId, centerId);
  }
}