import { Controller, Post, Body, Inject, Get, Query, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { CreateStudentDto } from './dto/request/create-student.dto';
import { IStudentService, STUDENT_SERVICE } from './student.service.interface';
import { User } from 'src/common/decorator/user.decorator';
import { FindStudentsDto } from './dto/request/find-students.dto';
import { UpdateStudentDto } from './dto/request/update-student.dto';

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

  @Get()
  async findManyByCenterId(@Query() findStudentsDto: FindStudentsDto, @User('centerId') centerId: number) {
    return {
      success: true,
      message: 'Successfully retrieved the student list',
      data: await this.studentService.findManyByCenterId(findStudentsDto, centerId),
    };
  }

  @Get('/:studentId')
  async findOne(@Param('studentId', ParseIntPipe) studentId: number, @User('centerId') centerId: number) {
    return {
      success: true,
      message: 'Successfully retrieved the student',
      data: await this.studentService.findOneByStudentId(studentId, centerId),
    };
  }

  @Patch('/:studentId')
  async updateStudent(
    @Body() updateStudentDto: UpdateStudentDto,
    @Param('studentId', ParseIntPipe) studentId: number,
    @User('centerId') centerId: number,
  ) {
    await this.studentService.updateStudent(updateStudentDto, studentId, centerId);

    return {
      success: true,
      message: 'Successfully modified your student information',
    };
  }
}
