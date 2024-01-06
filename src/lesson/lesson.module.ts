import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonEntity } from './entities/lesson.entity';
import { LessonRegistrationModule } from 'src/lesson-registration/lesson-registration.module';

@Module({
  imports: [TypeOrmModule.forFeature([LessonEntity]), LessonRegistrationModule],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
