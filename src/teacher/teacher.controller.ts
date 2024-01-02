import { Controller, Post, Body, Inject, Get, Query, ParseIntPipe, Param } from '@nestjs/common';
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

  @Get('/:teacherId')
  async findOne(@Param('teacherId', ParseIntPipe) teacherId: number, @User('centerId') centerId: number) {
    return {
      success: true,
      message: 'Successfully retrieved the teacher',
      data: await this.teacherService.findOneByTeacherId(teacherId, centerId),
    };
  }

  @Get()
  async findManyByCenterId(@Query() findTeachersDto: FindTeachersDto, @User('centerId') centerId: number) {
    return {
      success: true,
      message: 'Successfully retrieved the Teacher list',
      data: await this.teacherService.findManyByCenterId(findTeachersDto, centerId),
    };
  }
}
