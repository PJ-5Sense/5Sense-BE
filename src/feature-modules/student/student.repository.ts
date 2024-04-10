import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/request/create-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from './entity/student.entity';
import { Repository } from 'typeorm';
import { FindStudentsDto } from './dto/request/find-students.dto';
import { UpdateStudentDto } from './dto/request/update-student.dto';

@Injectable()
export class StudentRepository {
  constructor(@InjectRepository(StudentEntity) private readonly studentDAO: Repository<StudentEntity>) {}
  async create(createStudentDto: CreateStudentDto, centerId: number) {
    return await this.studentDAO.save({ ...createStudentDto, centerId });
  }

  async findExistingStudent(name: string, phone: string, centerId: number) {
    return await this.studentDAO.findOneBy({ name, phone, centerId });
  }

  async findManyByCenterId(findStudentsDto: FindStudentsDto, centerId: number) {
    const queryBuilder = this.studentDAO
      .createQueryBuilder('student')
      .where('student.centerId = :centerId', { centerId });

    if (findStudentsDto.searchBy === 'name') {
      queryBuilder
        .andWhere('student.name LIKE :name', { name: `%${findStudentsDto.name}%` })
        .orderBy(`LOCATE('${findStudentsDto.name}', student.name)`, 'ASC')
        .addOrderBy('student.name', 'ASC');
    }

    if (findStudentsDto.searchBy === 'phone') {
      queryBuilder
        .andWhere('student.phone LIKE :phone', { phone: `%${findStudentsDto.phone}%` })
        .orderBy(`LOCATE('${findStudentsDto.phone}', student.phone)`, 'ASC')
        .addOrderBy('student.phone', 'ASC');
    }

    if (findStudentsDto.searchBy === 'none') queryBuilder.orderBy('student.createdDate', 'DESC');

    return await queryBuilder.offset(findStudentsDto.getSkip()).limit(findStudentsDto.getTake()).getManyAndCount();
  }

  async findOneByStudentId(studentId: number, centerId: number) {
    return await this.studentDAO.findOneBy({ id: studentId, centerId });
  }

  async updateStudent(updateStudentDto: UpdateStudentDto, studentId: number, centerId: number): Promise<boolean> {
    const result = await this.studentDAO
      .createQueryBuilder()
      .update()
      .set({ ...updateStudentDto })
      .where('id = :id', { id: studentId })
      .andWhere('centerId = :centerId', { centerId })
      .execute();

    return result.affected === 0 ? false : true;
  }
}
