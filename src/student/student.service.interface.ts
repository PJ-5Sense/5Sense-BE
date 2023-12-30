import { CreateStudentDto } from './dto/create-student.dto';
import { FindStudentsDto } from './dto/find-students.dto';
export interface IStudentService {
  create(
    createStudentDto: CreateStudentDto,
    centerId: number,
  ): Promise<{ id: number; name: string; phone: string; particulars: string }>;

  findManyByCenterId(
    findStudentsDto: FindStudentsDto,
    centerId: number,
  ): Promise<{ students: { id: number; name: string; phone: string; particulars: string }[] }>;
}

export const STUDENT_SERVICE = Symbol('STUDENT_SERVICE');
