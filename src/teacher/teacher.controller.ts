import { Controller, Post, Body, Get, Query, ParseIntPipe, Param, Put } from '@nestjs/common';
import { CreateTeacherDto } from './dto/request/create-teacher.dto';
import { User } from 'src/common/decorator/user.decorator';
import { FindTeachersDto } from './dto/request/find-teachers.dto';
import { UpdateTeacherDto } from './dto/request/update-teacher.dto';
import { TeacherService } from './teacher.service';

@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  async create(@Body() createTeacherDto: CreateTeacherDto, @User('centerId') centerId: number) {
    return {
      success: true,
      message: 'The teacher has been successfully registered',
      data: await this.teacherService.create(createTeacherDto, centerId),
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

  @Get('/:teacherId')
  async findOne(@Param('teacherId', ParseIntPipe) teacherId: number, @User('centerId') centerId: number) {
    return {
      success: true,
      message: 'Successfully retrieved the teacher',
      data: await this.teacherService.findOneByTeacherId(teacherId, centerId),
    };
  }

  @Put('/:teacherId')
  async updateTeacher(
    @Body() updateTeacher: UpdateTeacherDto,
    @Param('teacherId', ParseIntPipe) teacherId: number,
    @User('centerId') centerId: number,
  ) {
    await this.teacherService.updateTeacher(updateTeacher, teacherId, centerId);

    return {
      success: true,
      message: 'Successfully modified your teacher information',
    };
  }
}
