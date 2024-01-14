import { Injectable } from '@nestjs/common';
import { IStudentDao } from './student.dao.interface';
import { CreateStudentDto } from '../dto/request/create-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from '../entities/student.entity';
import { Repository } from 'typeorm';
import { FindStudentsDto } from '../dto/request/find-students.dto';

@Injectable()
export class StudentDaoImpl implements IStudentDao {
  constructor(@InjectRepository(StudentEntity) private readonly studentRepository: Repository<StudentEntity>) {}
  async create(createStudentDto: CreateStudentDto, centerId: number) {
    return await this.studentRepository.save({ ...createStudentDto, centerId });
  }

  async findExistingStudent(name: string, phone: string, centerId: number) {
    return await this.studentRepository.findOneBy({ name, phone, centerId });
  }

  async findManyByCenterId(findStudentsDto: FindStudentsDto, centerId: number) {
    const queryBuilder = this.studentRepository
      .createQueryBuilder('student')
      .where('student.centerId = :centerId', { centerId });

    if (findStudentsDto.cursor) queryBuilder.andWhere('student.id < :id', { id: findStudentsDto.cursor });

    if (findStudentsDto.searchBy === 'name') {
      return await queryBuilder
        .limit(findStudentsDto.getTake())
        .andWhere('student.name LIKE :name', { name: `%${findStudentsDto.name}%` })
        .orderBy(`CASE WHEN student.name LIKE '${findStudentsDto.name}%' THEN 1 ELSE 2 END`, 'ASC')
        .addOrderBy('student.name', 'ASC')
        .getManyAndCount();
    }

    if (findStudentsDto.searchBy === 'phone')
      return await queryBuilder
        .limit(findStudentsDto.getTake())
        .andWhere('student.phone LIKE :phone', { phone: `%${findStudentsDto.phone}%` })
        .orderBy(
          `CASE WHEN student.phone LIKE '%${findStudentsDto.phone}%' THEN LOCATE('${findStudentsDto.phone}', student.phone) ELSE 2 END`,
          'ASC',
        )
        .addOrderBy('student.phone', 'ASC')
        .getManyAndCount();

    return await queryBuilder.limit(findStudentsDto.getTake()).orderBy('student.createdDate', 'DESC').getManyAndCount();
  }

  async findOneByStudentId(studentId: number, centerId: number) {
    return await this.studentRepository.findOneBy({ id: studentId, centerId });
  }
}
