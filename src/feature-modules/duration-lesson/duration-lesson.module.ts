import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DurationLessonEntity } from './duration-lesson.entity';
import { DurationLessonController } from './duration-lesson.controller';
import { DurationLessonService } from './duration.lesson.service';
import { DurationLessonRepository } from './duration-lesson.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DurationLessonEntity])],
  controllers: [DurationLessonController],
  providers: [DurationLessonService, DurationLessonRepository],
  exports: [],
})
export class DurationLessonModule {}
