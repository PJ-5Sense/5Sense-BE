import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DurationLessonEntity } from './entities/duration-lesson.entity';
import { SessionLessonEntity } from './entities/session-lesson.entity';
import { LessonCategoryModule } from 'src/lesson-category/category.module';
import { SessionLessonRegistrationEntity } from 'src/lesson-registration/entities/session-registration.entity';
import { DurationLessonRegistrationEntity } from 'src/lesson-registration/entities/duration-registration.entity';
import { SessionLessonScheduleEntity } from 'src/lesson-schedule/entities/session-lesson-schedule.entity';
import { DurationLessonScheduleEntity } from 'src/lesson-schedule/entities/duration-lesson-schedule.entity';
import { LessonRepository } from './lesson.repository';
import { LessonViewEntity } from './entities/lesson-view.entity';

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
