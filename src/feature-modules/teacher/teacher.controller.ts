import { Controller, Post, Body, Get, Query, ParseIntPipe, Param, Put } from '@nestjs/common';
import { CreateTeacherDTO } from './dto/request/create-teacher.dto';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { FindTeachersDTO } from './dto/request/find-teachers.dto';
import { UpdateTeacherDTO } from './dto/request/update-teacher.dto';
import { TeacherService } from './teacher.service';
import {
  SwaggerCreateTeacher,
  SwaggerFindManyTeacher,
  SwaggerTeacherDetail,
  SwaggerUpdateTeacher,
} from 'src/swagger/teacher.swagger';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Teacher - 강사')
@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @SwaggerCreateTeacher()
  @Post()
  async create(@Body() createTeacherDTO: CreateTeacherDTO, @CurrentUser('centerId') centerId: number) {
    return {
      success: true,
      message: 'The teacher has been successfully registered',
      data: await this.teacherService.create(createTeacherDTO, centerId),
    };
  }

  @SwaggerFindManyTeacher()
  @Get()
  async findManyByCenterId(@Query() findTeachersDTO: FindTeachersDTO, @CurrentUser('centerId') centerId: number) {
    return {
      success: true,
      message: 'Successfully retrieved the Teacher list',
      data: await this.teacherService.findManyByCenterId(findTeachersDTO, centerId),
    };
  }

  @SwaggerTeacherDetail()
  @Get('/:teacherId')
  async findOne(@Param('teacherId', ParseIntPipe) teacherId: number, @CurrentUser('centerId') centerId: number) {
    return {
      success: true,
      message: 'Successfully retrieved the teacher',
      data: await this.teacherService.findOneByTeacherId(teacherId, centerId),
    };
  }

  @SwaggerUpdateTeacher()
  @Put('/:teacherId')
  async updateTeacher(
    @Body() updateTeacherDTO: UpdateTeacherDTO,
    @Param('teacherId', ParseIntPipe) teacherId: number,
    @CurrentUser('centerId') centerId: number,
  ) {
    await this.teacherService.updateTeacher(updateTeacherDTO, teacherId, centerId);

    return {
      success: true,
      message: 'Successfully modified your teacher information',
    };
  }
}
