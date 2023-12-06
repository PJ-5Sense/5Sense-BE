import { Injectable } from '@nestjs/common';
import { CreateLessonStudentDto } from './dto/create-lesson-student.dto';
import { UpdateLessonStudentDto } from './dto/update-lesson-student.dto';

@Injectable()
export class LessonRegistrationService {
  create(createLessonStudentDto: CreateLessonStudentDto) {
    return 'This action adds a new lessonStudent';
  }

  findAll() {
    return `This action returns all lessonStudent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lessonStudent`;
  }

  update(id: number, updateLessonStudentDto: UpdateLessonStudentDto) {
    return `This action updates a #${id} lessonStudent`;
  }

  remove(id: number) {
    return `This action removes a #${id} lessonStudent`;
  }
}
