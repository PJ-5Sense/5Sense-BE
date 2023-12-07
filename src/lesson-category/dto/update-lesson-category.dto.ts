import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonCategoryDto } from './create-lesson-category.dto';

export class UpdateLessonCategoryDto extends PartialType(CreateLessonCategoryDto) {}
