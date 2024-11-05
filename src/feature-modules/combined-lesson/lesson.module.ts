import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionLessonEntity } from '../session-lesson/session-lesson.entity';
import { LessonCategoryModule } from 'src/feature-modules/lesson-category/category.module';
import { LessonRepository } from './lesson.repository';
import { LessonViewEntity } from './entity/lesson-view.entity';
import { DurationLessonEntity } from '../duration-lesson/duration-lesson.entity';
import { DateHelper } from 'src/common/helper/date.helper';

@Module({
  imports: [
    TypeOrmModule.forFeature([DurationLessonEntity, SessionLessonEntity, LessonViewEntity]),
    LessonCategoryModule,
  ],
  controllers: [LessonController],
  providers: [LessonService, LessonRepository, DateHelper],
})
export class LessonModule {}
