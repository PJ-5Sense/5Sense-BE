import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionLessonEntity } from './entity/session-lesson.entity';
import { LessonCategoryModule } from 'src/feature-modules/lesson-category/category.module';
import { LessonRepository } from './lesson.repository';
import { LessonViewEntity } from './entity/lesson-view.entity';
import { DurationLessonEntity } from '../duration-lesson/duration-lesson.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DurationLessonEntity, SessionLessonEntity, LessonViewEntity]),
    LessonCategoryModule,
  ],
  controllers: [LessonController],
  providers: [LessonService, LessonRepository],
})
export class LessonModule {}
