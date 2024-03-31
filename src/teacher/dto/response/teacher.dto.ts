import { TeacherEntity } from 'src/teacher/entity/teacher.entity';

export class ResponseTeacherDto {
  id: number;
  name: string;
  phone: string;

  static of(teacher: TeacherEntity): ResponseTeacherDto | null {
    if (!teacher) return null;

    return {
      id: teacher.id,
      name: teacher.name,
      phone: teacher.phone,
    };
  }
}
