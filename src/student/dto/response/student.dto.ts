import { StudentEntity } from 'src/student/entity/student.entity';

export class ResponseStudentDto {
  id: number;
  name: string;
  phone: string;
  particulars: string;

  static of(student: StudentEntity): ResponseStudentDto | null {
    if (!student) return null;

    return {
      id: student.id,
      name: student.name,
      phone: student.phone,
      particulars: student.particulars,
    };
  }
}
