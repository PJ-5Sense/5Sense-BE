import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonStudentDto } from './create-lesson-student.dto';

export class UpdateLessonStudentDto extends PartialType(CreateLessonStudentDto) {}
