import { Injectable } from '@nestjs/common';
import { CreateLessonDTO } from './dto/create-lesson.dto';
import { LessonEntity, LessonType } from './entities/lesson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DurationLessonEntity } from './entities/duration-lesson.entity';
import { LessonRegistrationEntity } from './lesson-registration/entities/lesson-registration.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonEntity) private readonly lessonRepository: Repository<LessonEntity>,
    @InjectRepository(DurationLessonEntity) private readonly durationLessonRepository: Repository<DurationLessonEntity>,
    @InjectRepository(LessonRegistrationEntity)
    private readonly lessonRegistrationRepository: Repository<LessonRegistrationEntity>,
  ) {}
  async create(createLessonDTO: CreateLessonDTO, centerId: number) {
    const { durationLesson, category, ...commonLessonData } = createLessonDTO;
    if (createLessonDTO.type === LessonType.DURATION) {
      // 레슨 정보 저장, 레슨 카테고리 저장, 선생님 정보

      const newLessonData = this.lessonRepository.create({ ...commonLessonData, categoryId: category.id, centerId });

      const lesson = await this.lessonRepository.save({ ...newLessonData });

      return await this.durationLessonRepository.save(
        this.durationLessonRepository.create({ ...durationLesson, lesson }),
      );
    }

    if (createLessonDTO.type === LessonType.SESSION) {
      const newLessonData = this.lessonRepository.create({ ...commonLessonData, categoryId: category.id, centerId });
      return await this.lessonRepository.save(newLessonData);
    }
  }
}
