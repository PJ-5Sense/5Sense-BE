import { CreateStudentDto } from './dto/create-student.dto';
export interface IStudentService {
  create(
    createStudentDto: CreateStudentDto,
    centerId: number,
  ): Promise<{ name: string; phone: string; particulars: string }>;
}

export const STUDENT_SERVICE = Symbol('STUDENT_SERVICE');
