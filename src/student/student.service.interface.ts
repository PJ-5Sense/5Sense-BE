import { PageMeta } from 'src/common/dto/response-page.dto';
import { CreateStudentDto } from './dto/request/create-student.dto';
import { FindStudentsDto } from './dto/request/find-students.dto';
import { ResponseStudentDto } from './dto/response/student.dto';
export interface IStudentService {
  create(createStudentDto: CreateStudentDto, centerId: number): Promise<ResponseStudentDto>;

  findManyByCenterId(
    findStudentsDto: FindStudentsDto,
    centerId: number,
  ): Promise<{ students: ResponseStudentDto[]; meta: PageMeta }>;

  findOneByStudentId(studentId: number, centerId: number): Promise<ResponseStudentDto>;
}

export const STUDENT_SERVICE = Symbol('STUDENT_SERVICE');
