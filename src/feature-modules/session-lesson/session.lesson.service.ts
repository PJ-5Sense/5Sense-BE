import { Injectable } from '@nestjs/common';
import { SessionLessonRepository } from './session-lesson.repository';
import { CreateSessionLessonDTO } from './dto/request/create-session-lesson.dto';
import { LessonCategoryService } from '../lesson-category/category.service';
import { LessonType } from '../combined-lesson/type/lesson.type';
import { UpdateSessionLessonDTO } from './dto/request/update-session-lesson.dto';

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

  async getOne(id: number, centerId: number) {
    const lesson = await this.sessionLessonRepository.getOne(id, centerId);

    return {
      id: lesson.id,
      name: lesson.name,
      memo: lesson.memo,
      type: LessonType.SESSION,
      teacher: lesson.teacher.name,
      teacherId: lesson.teacher.id,
      mainCategory: lesson.category.parentId ? lesson.category.parentName : lesson.category.name,
      subCategory: lesson.category.parentId ? lesson.category.name : null,
      category: lesson.category.id,
      tuitionFee: lesson.tuitionFee,
      lessonTime: lesson.lessonTime,
      totalSessions: lesson.totalSessions,
      capacity: lesson.capacity,
      numberOfStudents: lesson.sessionRegistrations.length,
      registeredStudents: lesson.sessionRegistrations.map(registration => {
        return {
          name: registration.student.name,
          phone: registration.student.phone,
          sessionCount: `${registration.sessionSchedules.length}/${lesson.totalSessions}`,
        };
      }),
    };
  }

  async update(updateSessionLessonDTO: UpdateSessionLessonDTO, lessonId: number, centerId: number) {
    await this.sessionLessonRepository.update(lessonId, updateSessionLessonDTO, centerId);
  }

  async closeLesson(lessonId: number, centerId: number) {
    return await this.sessionLessonRepository.closeSessionLesson(lessonId, centerId);
  }
}
