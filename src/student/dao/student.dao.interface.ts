import { CreateStudentDto } from '../dto/create-student.dto';
import { StudentEntity } from '../entities/student.entity';

export interface IStudentDao {
  create(createStudentDto: CreateStudentDto, centerId: number): Promise<StudentEntity>;
  findExistingStudent(name: string, phone: string): Promise<StudentEntity>;
}

export const STUDENT_DAO = Symbol('STUDENT_DAO');
