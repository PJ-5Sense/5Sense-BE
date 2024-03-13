import { Injectable } from '@nestjs/common';
import { CreateLessonScheduleDto } from './dto/create-lesson-schedule.dto';
import { UpdateLessonScheduleDto } from './dto/update-lesson-schedule.dto';

@Injectable()
export class LessonScheduleService {
  create(createLessonScheduleDto: CreateLessonScheduleDto) {
    return 'This action adds a new lessonSchedule';
  }

  findAll() {
    return `This action returns all lessonSchedule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lessonSchedule`;
  }

  update(id: number, updateLessonScheduleDto: UpdateLessonScheduleDto) {
    return `This action updates a #${id} lessonSchedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} lessonSchedule`;
  }
}
