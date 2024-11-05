import { Controller, Post, Body, Get, Query, Param, ParseIntPipe, Put } from '@nestjs/common';
import { CreateStudentDTO } from './dto/request/create-student.dto';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { FindStudentsDTO } from './dto/request/find-students.dto';
import { UpdateStudentDTO } from './dto/request/update-student.dto';
import { StudentService } from './student.service';
import {
  SwaggerCreateStudent,
  SwaggerFindManyStudent,
  SwaggerFindManyStudentForLesson,
  SwaggerStudentDetail,
  SwaggerUpdateStudent,
} from 'src/swagger/student.swagger';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Student - 학생')
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @SwaggerCreateStudent()
  @Post()
  async create(@Body() createStudentDTO: CreateStudentDTO, @CurrentUser('centerId') centerId: number) {
    return {
      success: true,
      message: 'The student has been successfully registered',
      data: await this.studentService.create(createStudentDTO, centerId),
    };
  }

  @SwaggerFindManyStudent()
  @Get()
  async findMany(@Query() findStudentsDTO: FindStudentsDTO, @CurrentUser('centerId') centerId: number) {
    return {
      success: true,
      message: 'Successfully retrieved the student list',
      data: await this.studentService.findManyByCenterId(findStudentsDTO, centerId),
    };
  }

  @SwaggerFindManyStudentForLesson()
  @Get('lessons/:lessonId')
  async findManyForLesson(@Param('lessonId') lessonId: number, @CurrentUser('centerId') centerId: number) {
    return {
      success: true,
      message: 'Successfully retrieved the student list for Lesson',
      data: await this.studentService.findManyForLesson(lessonId, centerId),
    };
  }

  @SwaggerStudentDetail()
  @Get('/:studentId')
  async findOne(@Param('studentId', ParseIntPipe) studentId: number, @CurrentUser('centerId') centerId: number) {
    return {
      success: true,
      message: 'Successfully retrieved the student',
      data: await this.studentService.findOneByStudentId(studentId, centerId),
    };
  }

  @SwaggerUpdateStudent()
  @Put('/:studentId')
  async updateStudent(
    @Body() updateStudentDTO: UpdateStudentDTO,
    @Param('studentId', ParseIntPipe) studentId: number,
    @CurrentUser('centerId') centerId: number,
  ) {
    await this.studentService.updateStudent(updateStudentDTO, studentId, centerId);

    return {
      success: true,
      message: 'Successfully modified your student information',
    };
  }
}
