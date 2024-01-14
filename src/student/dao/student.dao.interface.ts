import { CreateStudentDto } from '../dto/request/create-student.dto';
import { FindStudentsDto } from '../dto/request/find-students.dto';
import { UpdateStudentDto } from '../dto/request/update-student.dto';
import { StudentEntity } from '../entities/student.entity';

export interface IStudentDao {
  create(createStudentDto: CreateStudentDto, centerId: number): Promise<StudentEntity>;
  findExistingStudent(name: string, phone: string, centerId: number): Promise<StudentEntity>;
  findManyByCenterId(findStudentsDto: FindStudentsDto, centerId: number): Promise<[StudentEntity[], number]>;
  findOneByStudentId(studentId: number, centerId: number): Promise<StudentEntity>;
  updateStudent(updateStudentDto: UpdateStudentDto, studentId: number, centerId: number): Promise<boolean>;
}

export const STUDENT_DAO = Symbol('STUDENT_DAO');
