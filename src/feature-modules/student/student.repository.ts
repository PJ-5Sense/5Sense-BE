import { Injectable } from '@nestjs/common';
import { CreateStudentDTO } from './dto/request/create-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from './entity/student.entity';
import { Repository } from 'typeorm';
import { FindStudentsDTO } from './dto/request/find-students.dto';
import { UpdateStudentDTO } from './dto/request/update-student.dto';

@Injectable()
export class StudentRepository {
  constructor(@InjectRepository(StudentEntity) private readonly studentDAO: Repository<StudentEntity>) {}
  async create(createStudentDTO: CreateStudentDTO, centerId: number) {
    return await this.studentDAO.save({ ...createStudentDTO, centerId });
  }

  async findExistingStudent(name: string, phone: string, centerId: number) {
    return await this.studentDAO.findOneBy({ name, phone, centerId });
  }

  async findManyByCenterId(findStudentsDTO: FindStudentsDTO, centerId: number) {
    const queryBuilder = this.studentDAO
      .createQueryBuilder('student')
      .select(['student.id', 'student.name', 'student.phone', 'student.particulars', 'student.createdDate'])
      .leftJoin('student.sessionRegistrations', 'sessionRegistrations')
      .addSelect(['sessionRegistrations.id'])
      .leftJoin('sessionRegistrations.sessionLesson', 'sessionLesson')
      .addSelect(['sessionLesson.id', 'sessionLesson.name'])
      .leftJoin('student.durationRegistrations', 'durationRegistrations')
      .addSelect(['durationRegistrations.id'])
      .leftJoin('durationRegistrations.durationLesson', 'durationLesson')
      .addSelect(['durationLesson.id', 'durationLesson.name'])
      .where('student.centerId = :centerId', { centerId });

    if (findStudentsDTO.searchBy === 'name') {
      queryBuilder
        .andWhere('student.name LIKE :name', { name: `%${findStudentsDTO.name}%` })
        .orderBy(`LOCATE('${findStudentsDTO.name}', student.name)`, 'ASC')
        .addOrderBy('student.name', 'ASC');
    }

    if (findStudentsDTO.searchBy === 'phone') {
      queryBuilder
        .andWhere('student.phone LIKE :phone', { phone: `%${findStudentsDTO.phone}%` })
        .orderBy(`LOCATE('${findStudentsDTO.phone}', student.phone)`, 'ASC')
        .addOrderBy('student.phone', 'ASC');
    }

    if (findStudentsDTO.searchBy === 'none') queryBuilder.orderBy('student.createdDate', 'DESC');

    return await queryBuilder.offset(findStudentsDTO.getSkip()).limit(findStudentsDTO.getTake()).getManyAndCount();
  }

  async findManyForLesson(lessonId: number, centerId: number) {
    return await this.studentDAO
      .createQueryBuilder('S')
      .select(['S.id', 'S.name', 'S.phone'])
      .innerJoin('S.sessionRegistrations', 'SR')
      .addSelect(['SR.id', 'SR.lessonId'])
      .where('S.centerId = :centerId', { centerId })
      .andWhere('SR.lessonId = :lessonId', { lessonId })
      .getMany();
  }

  async findOneByStudentId(studentId: number, centerId: number) {
    return await this.studentDAO
      .createQueryBuilder('S') // S  = student
      .select(['S.id', 'S.name', 'S.phone', 'S.particulars'])
      .leftJoin('S.billingPayments', 'BP')
      .addSelect(['BP.id', 'BP.paymentStatus'])
      .leftJoin('BP.durationLesson', 'DL')
      .addSelect(['DL.id', 'DL.name'])
      .leftJoin('DL.durationSchedules', 'DLS')
      .addSelect(['DLS.id', 'DLS.startDate', 'DLS.endDate', 'DLS.startTime', 'DLS.endTime', 'DLS.repeatDate'])
      .leftJoin('DLS.lessonRoom', 'LR')
      .addSelect(['LR.id', 'LR.name'])
      .leftJoin('BP.sessionLesson', 'SL')
      .addSelect(['SL.id', 'SL.name', 'SL.totalSessions'])
      .leftJoin('SL.sessionRegistrations', 'SLR', 'SLR.studentId = S.id')
      .addSelect(['SLR.id'])
      .leftJoin('SLR.sessionSchedules', 'SLS')
      .addSelect(['SLS.id'])
      .where('S.id = :studentId', { studentId })
      .andWhere('S.centerId = :centerId', { centerId })
      .getOne();
  }

  async updateStudent(updateStudentDTO: UpdateStudentDTO, studentId: number, centerId: number): Promise<boolean> {
    const result = await this.studentDAO
      .createQueryBuilder()
      .update()
      .set({ ...updateStudentDTO })
      .where('id = :id', { id: studentId })
      .andWhere('centerId = :centerId', { centerId })
      .execute();

    return result.affected === 0 ? false : true;
  }
}
