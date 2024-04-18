import { Injectable } from '@nestjs/common';
import { DurationLessonRepository } from './duration-lesson.repository';
import { CreateDurationLessonDTO } from './dto/request/create-duration-lesson.dto';
import { LessonCategoryService } from '../lesson-category/category.service';
import { LessonType } from '../combined-lesson/type/lesson.type';
import { UpdateDurationLessonDTO } from './dto/request/update-duration-lesson-dto';
import { ResponseGetDetailDurationLessonDTO } from './dto/response/get-detail-lesson.dto';

@Injectable()
export class DurationLessonService {
  constructor(
    private readonly durationLessonRepository: DurationLessonRepository,
    private readonly lessonCategoryService: LessonCategoryService,
  ) {}

  async create(durationLessonDTO: CreateDurationLessonDTO, centerId: number) {
    // 카테고리가 대분류 기타라면 존재하는지 확인 하는 처리
    if (!durationLessonDTO.category.id) {
      durationLessonDTO.category.id = await this.lessonCategoryService.processEtceteraCategory(
        durationLessonDTO.category.name,
      );

      const { schedules, category, ...durationLesson } = durationLessonDTO;

      await this.durationLessonRepository.create(
        {
          ...durationLesson,
          centerId,
          categoryId: category.id,
        },
        schedules,
      );
    }
  }

  async getOne(id: number, centerId: number) {
    const lesson = await this.durationLessonRepository.getOne(id, centerId);

    return new ResponseGetDetailDurationLessonDTO(lesson);
  }

  async updateLesson(updateDurationLessonDTO: UpdateDurationLessonDTO, lessonId: number, centerId: number) {
    const { schedules, category, ...duration } = updateDurationLessonDTO;
    await this.durationLessonRepository.update(lessonId, { ...duration, categoryId: category.id, centerId }, schedules);
  }

  async closeLesson(lessonId: number, centerId: number) {
    await this.durationLessonRepository.closeLesson(lessonId, centerId);
  }

  private formatLessonDurationDates(start: Date, end: Date) {
    const startDate = `${start.getFullYear()}.` + `${start.getMonth() + 1}.` + `${start.getDate()}`;
    const endDate = `${end.getFullYear()}.` + `${end.getMonth() + 1}.` + `${end.getDate()}`;

    return startDate + ' ~ ' + endDate;
  }
}
