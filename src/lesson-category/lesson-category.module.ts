import { Module } from '@nestjs/common';
import { LessonCategoryService } from './lesson-category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonCategoryEntity } from './entities/lesson-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LessonCategoryEntity])],
  providers: [LessonCategoryService],
  exports: [LessonCategoryService],
})
export class LessonCategoryModule {}
