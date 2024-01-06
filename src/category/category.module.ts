import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { LessonCategoryModule } from 'src/lesson-category/lesson-category.module';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity]), LessonCategoryModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
