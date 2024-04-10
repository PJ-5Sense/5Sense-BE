import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DurationLessonEntity } from './entity/duration-lesson.entity';
import { SessionLessonEntity } from './entity/session-lesson.entity';
import { LessonCategoryModule } from 'src/lesson-category/category.module';
import { LessonRepository } from './lesson.repository';
import { LessonViewEntity } from './entity/lesson-view.entity';
import { LessonScheduleModule } from '../lesson-schedule/lesson-schedule.module';
import { LessonRegistrationModule } from 'src/lesson-registration/lesson-registration.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DurationLessonEntity, SessionLessonEntity, LessonViewEntity]),
    LessonScheduleModule,
    LessonCategoryModule,
    LessonRegistrationModule,
  ],
  controllers: [LessonController],
  providers: [LessonService, LessonRepository],
})
export class LessonModule {}
