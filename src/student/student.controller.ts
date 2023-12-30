import { Controller, Post, Body, Inject, Get, Query } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { IStudentService, STUDENT_SERVICE } from './student.service.interface';
import { User } from 'src/common/decorator/user.decorator';
import { FindStudentsDto } from './dto/find-students.dto';

@Controller('students')
export class StudentController {
  constructor(@Inject(STUDENT_SERVICE) private readonly studentService: IStudentService) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto, @User('centerId') centerId: number) {
    return {
      success: true,
      message: 'The student has been successfully registered',
      data: await this.studentService.create(createStudentDto, centerId),
    };
  }

  @Get('')
  async findManyByCenterId(@Query() findStudentsDto: FindStudentsDto, @User('centerId') centerId: number) {
    return {
      success: true,
      message: 'Successfully retrieved the student list',
      data: await this.studentService.findManyByCenterId(findStudentsDto, centerId),
    };
  }
}
