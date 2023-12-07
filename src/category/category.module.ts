import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { LessonCategoryEntity } from 'src/lesson-category/entities/lesson-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity]), LessonCategoryEntity],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
