import { CreateTeacherDto } from '../dto/reqeust/create-teacher.dto';
import { TeacherEntity } from '../entities/teacher.entity';

export interface ITeacherDao {
  create(createTeacherDto: CreateTeacherDto, centerId: number): Promise<TeacherEntity>;
  findExistingTeacher(name: string, phone: string, centerId: number): Promise<TeacherEntity>;
}

export const TEACHER_DAO = Symbol('TEACHER_DAO');
