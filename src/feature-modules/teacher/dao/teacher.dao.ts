import { CreateTeacherDto } from '../dto/request/create-teacher.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherEntity } from '../entity/teacher.entity';
import { Repository } from 'typeorm';
import { FindTeachersDto } from '../dto/request/find-teachers.dto';
import { UpdateTeacherDto } from '../dto/request/update-teacher.dto';

@Injectable()
export class TeacherRepository {
  constructor(@InjectRepository(TeacherEntity) private readonly teacherDAO: Repository<TeacherEntity>) {}
  async create(createTeacherDto: CreateTeacherDto, centerId: number) {
    return await this.teacherDAO.save({ ...createTeacherDto, centerId });
  }

  async findExistingTeacher(name: string, phone: string, centerId: number) {
    return await this.teacherDAO.findOneBy({ name, phone, centerId });
  }

  async findManyByCenterId(findTeachersDto: FindTeachersDto, centerId: number) {
    const searchBy = findTeachersDto.searchBy === 'none' ? 'name' : findTeachersDto.searchBy;
    const queryBuilder = this.teacherDAO
      .createQueryBuilder('teacher')
      .where('teacher.centerId = :centerId', { centerId });

    if (findTeachersDto.searchBy === 'name') {
      queryBuilder
        .andWhere('teacher.name LIKE :name', { name: `%${findTeachersDto.name}%` })
        .orderBy(`LOCATE('${findTeachersDto.name}', teacher.name)`, 'ASC');
    }

    if (findTeachersDto.searchBy === 'phone') {
      queryBuilder
        .andWhere('teacher.phone LIKE :phone', { phone: `%${findTeachersDto.phone}%` })
        .orderBy(`LOCATE('${findTeachersDto.phone}', teacher.phone)`, 'ASC');
    }

    return await queryBuilder
      .addOrderBy(`teacher.${searchBy}`, 'ASC')
      .offset(findTeachersDto.getSkip())
      .limit(findTeachersDto.getTake())
      .getManyAndCount();
  }

  async findOneByTeacherId(teacherId: number, centerId: number) {
    return await this.teacherDAO.findOneBy({ id: teacherId, centerId });
  }

  async updateTeacher(updateTeacher: UpdateTeacherDto, teacherId: number, centerId: number): Promise<boolean> {
    const result = await this.teacherDAO
      .createQueryBuilder()
      .update()
      .set({ ...updateTeacher })
      .where('id = :id', { id: teacherId })
      .andWhere('centerId = :centerId', { centerId })
      .execute();

    return result.affected === 0 ? false : true;
  }
}
