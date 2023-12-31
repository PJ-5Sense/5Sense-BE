import { CreateTeacherDto } from './dto/reqeust/create-teacher.dto';

export interface ITeacherService {
  create(createTeacherDto: CreateTeacherDto, centerId: number): Promise<any>;
}

export const TEACHER_SERVICE = Symbol('TEACHER_SERVICE');
