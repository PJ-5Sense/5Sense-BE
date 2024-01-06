import { CreateTeacherDto } from '../dto/request/create-teacher.dto';
import { FindTeachersDto } from '../dto/request/find-teachers.dto';
import { TeacherEntity } from '../entities/teacher.entity';

export interface ITeacherDao {
  create(createTeacherDto: CreateTeacherDto, centerId: number): Promise<TeacherEntity>;
  findExistingTeacher(name: string, phone: string, centerId: number): Promise<TeacherEntity>;
  findManyByCenterId(findTeachersDto: FindTeachersDto, centerId: number): Promise<[TeacherEntity[], number]>;
  findOneByTeacherId(teacherId: number, centerId: number): Promise<TeacherEntity>;
}

export const TEACHER_DAO = Symbol('TEACHER_DAO');
