import { CreateTeacherDTO } from './dto/request/create-teacher.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherEntity } from './entity/teacher.entity';
import { Repository } from 'typeorm';
import { FindTeachersDTO } from './dto/request/find-teachers.dto';
import { UpdateTeacherDTO } from './dto/request/update-teacher.dto';

@Injectable()
export class TeacherRepository {
  constructor(@InjectRepository(TeacherEntity) private readonly teacherDAO: Repository<TeacherEntity>) {}
  async create(createTeacherDTO: CreateTeacherDTO, centerId: number) {
    return await this.teacherDAO.save({ ...createTeacherDTO, centerId });
  }

  async findExistingTeacher(name: string, phone: string, centerId: number) {
    return await this.teacherDAO.findOneBy({ name, phone, centerId });
  }

  async findManyByCenterId(findTeachersDTO: FindTeachersDTO, centerId: number) {
    const searchBy = findTeachersDTO.searchBy === 'none' ? 'name' : findTeachersDTO.searchBy;
    const queryBuilder = this.teacherDAO
      .createQueryBuilder('teacher')
      .where('teacher.centerId = :centerId', { centerId });

    if (findTeachersDTO.searchBy === 'name') {
      queryBuilder
        .andWhere('teacher.name LIKE :name', { name: `%${findTeachersDTO.name}%` })
        .orderBy(`LOCATE('${findTeachersDTO.name}', teacher.name)`, 'ASC');
    }

    if (findTeachersDTO.searchBy === 'phone') {
      queryBuilder
        .andWhere('teacher.phone LIKE :phone', { phone: `%${findTeachersDTO.phone}%` })
        .orderBy(`LOCATE('${findTeachersDTO.phone}', teacher.phone)`, 'ASC');
    }

    return await queryBuilder
      .addOrderBy(`teacher.${searchBy}`, 'ASC')
      .offset(findTeachersDTO.getSkip())
      .limit(findTeachersDTO.getTake())
      .getManyAndCount();
  }

  async findOneByTeacherId(teacherId: number, centerId: number) {
    return await this.teacherDAO
      .createQueryBuilder('teacher')
      .select(['teacher.id', 'teacher.name', 'teacher.phone'])
      .leftJoin('teacher.durationLessons', 'DL', 'teacher.id = DL.teacherId')
      .addSelect(['DL.id', 'DL.name'])
      .leftJoin('DL.durationSchedules', 'DS', 'DS.lessonId = DL.id')
      .addSelect(['DS.id', 'DS.startDate', 'DS.endDate', 'DS.startTime', 'DS.endTime', 'DS.repeatDate'])
      .leftJoin('teacher.sessionLessons', 'SL', 'teacher.id = SL.teacherId')
      .addSelect(['SL.id', 'SL.name', 'SL.totalSessions', 'SL.capacity'])
      .where('teacher.centerId = :centerId', { centerId })
      .andWhere('teacher.id = :id', { id: teacherId })
      .getOne();
  }

  async updateTeacher(updateTeacherDTO: UpdateTeacherDTO, teacherId: number, centerId: number): Promise<boolean> {
    const result = await this.teacherDAO
      .createQueryBuilder()
      .update()
      .set({ ...updateTeacherDTO })
      .where('id = :id', { id: teacherId })
      .andWhere('centerId = :centerId', { centerId })
      .execute();

    return result.affected === 0 ? false : true;
  }
}
