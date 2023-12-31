import { Controller, Post, Body, Inject, Get, Query } from '@nestjs/common';
import { TeacherServiceImpl } from './teacher.service';
import { CreateTeacherDto } from './dto/request/create-teacher.dto';
import { TEACHER_SERVICE } from './teacher.service.interface';
import { User } from 'src/common/decorator/user.decorator';
import { FindTeachersDto } from './dto/request/find-teachers.dto';

@Controller('teachers')
export class TeacherController {
  constructor(@Inject(TEACHER_SERVICE) private readonly teacherService: TeacherServiceImpl) {}

  @Post()
  async create(@Body() createTeacherDto: CreateTeacherDto, @User('centerId') centerId: number) {
    return {
      success: true,
      message: 'The teacher has been successfully registered',
      data: await this.teacherService.create(createTeacherDto, centerId),
    };
  }

  @Get()
  async findManyByCenterId(@Query() findStudentsDto: FindTeachersDto, @User('centerId') centerId: number) {
    return {
      success: true,
      message: 'Successfully retrieved the student list',
      data: await this.teacherService.findManyByCenterId(findStudentsDto, centerId),
    };
  }
}
