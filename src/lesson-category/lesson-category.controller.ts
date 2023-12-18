import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LessonCategoryService } from './lesson-category.service';
import { CreateLessonCategoryDto } from './dto/create-lesson-category.dto';
import { UpdateLessonCategoryDto } from './dto/update-lesson-category.dto';

@Controller('lesson-category')
export class LessonCategoryController {
  constructor(private readonly lessonCategoryService: LessonCategoryService) {}

  @Post()
  create(@Body() createLessonCategoryDto: CreateLessonCategoryDto) {
    return this.lessonCategoryService.create(createLessonCategoryDto);
  }

  @Get()
  findAll() {
    return this.lessonCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonCategoryDto: UpdateLessonCategoryDto) {
    return this.lessonCategoryService.update(+id, updateLessonCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonCategoryService.remove(+id);
  }
}
