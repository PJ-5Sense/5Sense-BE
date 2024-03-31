import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DurationLessonEntity } from './entity/duration/duration-lesson.entity';
import { SessionLessonEntity } from './entity/session/session-lesson.entity';
import { LessonCategoryModule } from 'src/lesson-category/category.module';
import { SessionLessonRegistrationEntity } from 'src/lesson/entity/session/session-registration.entity';
import { DurationLessonRegistrationEntity } from 'src/lesson/entity/duration/duration-registration.entity';
import { LessonRepository } from './lesson.repository';
import { LessonViewEntity } from './entity/lesson-view.entity';
import { DurationLessonScheduleEntity } from './entity/duration/duration-lesson-schedule.entity';
import { SessionLessonScheduleEntity } from './entity/session/session-lesson-schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DurationLessonEntity,
      SessionLessonEntity,
      DurationLessonRegistrationEntity,
      SessionLessonRegistrationEntity,
      DurationLessonScheduleEntity,
      SessionLessonScheduleEntity,
      LessonViewEntity,
    ]),
    LessonCategoryModule,
  ],
  controllers: [LessonController],
  providers: [LessonService, LessonRepository],
})
export class LessonModule {}
