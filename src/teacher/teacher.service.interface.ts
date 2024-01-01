import { CreateTeacherDto } from './dto/request/create-teacher.dto';
import { FindTeachersDto } from './dto/request/find-teachers.dto';
import { ResponseTeacherDto } from './dto/response/teacher.dto';

export interface ITeacherService {
  create(createTeacherDto: CreateTeacherDto, centerId: number): Promise<ResponseTeacherDto>;
  findManyByCenterId(findTeachersDto: FindTeachersDto, centerId: number): Promise<{ teachers: ResponseTeacherDto[] }>;
}

export const TEACHER_SERVICE = Symbol('TEACHER_SERVICE');
