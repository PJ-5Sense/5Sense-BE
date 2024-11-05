import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DurationLessonEntity } from './duration-lesson.entity';
import { DurationLessonController } from './duration-lesson.controller';
import { DurationLessonService } from './duration.lesson.service';
import { DurationLessonRepository } from './duration-lesson.repository';
import { LessonCategoryModule } from '../lesson-category/category.module';
import { DurationLessonScheduleEntity } from '../duration-lesson-registration/entity/duration-lesson-schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DurationLessonEntity, DurationLessonScheduleEntity]), LessonCategoryModule],
  controllers: [DurationLessonController],
  providers: [DurationLessonService, DurationLessonRepository],
  exports: [],
})
export class DurationLessonModule {}
