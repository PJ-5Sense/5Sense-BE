import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonEntity } from './entities/lesson.entity';
import { LessonRegistrationModule } from 'src/lesson/lesson-registration/lesson-registration.module';
import { DurationLessonEntity } from './entities/duration-lesson.entity';
import { LessonRegistrationEntity } from './lesson-registration/entities/lesson-registration.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LessonEntity, DurationLessonEntity, LessonRegistrationEntity]),
    LessonRegistrationModule,
  ],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
