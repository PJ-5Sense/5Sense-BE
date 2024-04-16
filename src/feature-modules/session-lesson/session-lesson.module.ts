import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionLessonEntity } from '../combined-lesson/entity/session-lesson.entity';
import { SessionLessonController } from './session-lesson.controller';
import { SessionLessonService } from './session.lesson.service';
import { SessionLessonRepository } from './session-lesson.repository';
import { LessonCategoryModule } from '../lesson-category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([SessionLessonEntity]), LessonCategoryModule],
  controllers: [SessionLessonController],
  providers: [SessionLessonService, SessionLessonRepository],
})
export class SessionLessonModule {}
