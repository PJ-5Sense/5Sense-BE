import { Injectable } from '@nestjs/common';
import { CreateLessonCategoryDto } from './dto/create-lesson-category.dto';
import { UpdateLessonCategoryDto } from './dto/update-lesson-category.dto';

@Injectable()
export class LessonCategoryService {
  create(createLessonCategoryDto: CreateLessonCategoryDto) {
    return 'This action adds a new lessonCategory';
  }

  findAll() {
    return `This action returns all lessonCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lessonCategory`;
  }

  update(id: number, updateLessonCategoryDto: UpdateLessonCategoryDto) {
    return `This action updates a #${id} lessonCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} lessonCategory`;
  }
}
