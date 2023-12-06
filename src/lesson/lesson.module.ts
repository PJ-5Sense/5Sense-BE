import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonEntity } from './entities/lesson.entity';
import { LessonRegistrationModule } from 'src/lesson-registration/lesson-student.module';
import { LessonCategoryModule } from 'src/lesson-category/lesson-category.module';

@Module({
  imports: [TypeOrmModule.forFeature([LessonEntity]), LessonRegistrationModule, LessonCategoryModule],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
