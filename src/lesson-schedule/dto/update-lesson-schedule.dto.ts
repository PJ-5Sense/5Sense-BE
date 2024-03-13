import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonScheduleDto } from './create-lesson-schedule.dto';

export class UpdateLessonScheduleDto extends PartialType(CreateLessonScheduleDto) {}
