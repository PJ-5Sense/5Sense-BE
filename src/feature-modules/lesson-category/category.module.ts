import { Module } from '@nestjs/common';
import { LessonCategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
  providers: [LessonCategoryService],
  exports: [LessonCategoryService],
})
export class LessonCategoryModule {}
