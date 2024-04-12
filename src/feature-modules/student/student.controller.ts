import { Controller, Post, Body, Get, Query, Param, ParseIntPipe, Put } from '@nestjs/common';
import { CreateStudentDTO } from './dto/request/create-student.dto';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { FindStudentsDto } from './dto/request/find-students.dto';
import { UpdateStudentDto } from './dto/request/update-student.dto';
import { StudentService } from './student.service';
import {
  SwaggerCreateStudent,
  SwaggerFindManyStudent,
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
  async create(@Body() createStudentDto: CreateStudentDTO, @CurrentUser('centerId') centerId: number) {
    return {
      success: true,
      message: 'The student has been successfully registered',
      data: await this.studentService.create(createStudentDto, centerId),
    };
  }

  @SwaggerFindManyStudent()
  @Get()
  async findManyByCenterId(@Query() findStudentsDto: FindStudentsDto, @CurrentUser('centerId') centerId: number) {
    return {
      success: true,
      message: 'Successfully retrieved the student list',
      data: await this.studentService.findManyByCenterId(findStudentsDto, centerId),
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
    @Body() updateStudentDto: UpdateStudentDto,
    @Param('studentId', ParseIntPipe) studentId: number,
    @CurrentUser('centerId') centerId: number,
  ) {
    await this.studentService.updateStudent(updateStudentDto, studentId, centerId);

    return {
      success: true,
      message: 'Successfully modified your student information',
    };
  }
}
