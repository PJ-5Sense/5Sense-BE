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
    return await this.studentDAO
      .createQueryBuilder('S') // S  = student
      .select(['S.id', 'S.name', 'S.phone', 'S.particulars'])
      .leftJoin('S.durationRegistrations', 'DR')
      .addSelect(['DR.id'])
      .leftJoin('DR.durationLesson', 'DL', 'DR.lessonId = DL.id')
      .addSelect(['DL.id', 'DL.name'])
      .leftJoin('DL.durationSchedules', 'DS')
      .addSelect(['DS.id', 'DS.startDate', 'DS.endDate', 'DS.startTime', 'DS.endTime', 'DS.repeatDate'])
      .leftJoin('DS.lessonRoom', 'LR')
      .addSelect(['LR.id', 'LR.name'])
      .leftJoin('S.sessionRegistrations', 'SR')
      .addSelect(['SR.id'])
      .leftJoin('SR.sessionLesson', 'SL')
      .addSelect(['SL.id', 'SL.name', 'SL.totalSessions'])
      .leftJoin('SR.sessionSchedules', 'SS')
      .addSelect(['SS.id'])
      .where('S.id = :studentId', { studentId })
      .andWhere('S.centerId = :centerId', { centerId })
      .getOne();
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
