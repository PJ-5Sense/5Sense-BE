import { CreateTeacherDto } from '../dto/request/create-teacher.dto';
import { Injectable } from '@nestjs/common';
import { ITeacherDao } from './teacher.dao.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherEntity } from '../entities/teacher.entity';
import { Repository } from 'typeorm';
import { FindTeachersDto } from '../dto/request/find-teachers.dto';
import { UpdateTeacherDto } from '../dto/request/update-teacher.dto';

@Injectable()
export class TeacherDaoImpl implements ITeacherDao {
  constructor(@InjectRepository(TeacherEntity) private readonly teacherRepository: Repository<TeacherEntity>) {}
  async create(createTeacherDto: CreateTeacherDto, centerId: number) {
    return await this.teacherRepository.save({ ...createTeacherDto, centerId });
  }

  async findExistingTeacher(name: string, phone: string, centerId: number) {
    return await this.teacherRepository.findOneBy({ name, phone, centerId });
  }

  async findManyByCenterId(findTeachersDto: FindTeachersDto, centerId: number) {
    const searchBy = findTeachersDto.searchBy === 'none' ? 'name' : findTeachersDto.searchBy;
    const queryBuilder = this.teacherRepository
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
    return await this.teacherRepository.findOneBy({ id: teacherId, centerId });
  }

  async updateTeacher(updateTeacher: UpdateTeacherDto, teacherId: number, centerId: number): Promise<boolean> {
    const result = await this.teacherRepository
      .createQueryBuilder()
      .update()
      .set({ ...updateTeacher })
      .where('id = :id', { id: teacherId })
      .andWhere('centerId = :centerId', { centerId })
      .execute();

    return result.affected === 0 ? false : true;
  }
}
