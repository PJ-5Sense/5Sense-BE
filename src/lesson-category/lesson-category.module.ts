import { LessonCategoryEntity } from 'src/lesson-category/entities/lesson-category.entity';
import { Module } from '@nestjs/common';
import { LessonCategoryService } from './lesson-category.service';
import { LessonCategoryController } from './lesson-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LessonCategoryEntity])],
  controllers: [LessonCategoryController],
  providers: [LessonCategoryService],
})
export class LessonCategoryModule {}
