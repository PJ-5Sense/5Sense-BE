import { CreateTeacherDto } from '../dto/request/create-teacher.dto';
import { Injectable } from '@nestjs/common';
import { ITeacherDao } from './teacher.dao.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherEntity } from '../entities/teacher.entity';
import { Repository } from 'typeorm';
import { FindTeachersDto } from '../dto/request/find-teachers.dto';

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
    const queryBuilder = this.teacherRepository
      .createQueryBuilder('teacher')
      .where('teacher.centerId = :centerId', { centerId });

    if (findTeachersDto.cursor) queryBuilder.andWhere('teacher.id < :id', { id: findTeachersDto.cursor });

    if (findTeachersDto.searchBy === 'name')
      queryBuilder.andWhere('teacher.name LIKE :name', { name: `%${findTeachersDto.name}%` });

    if (findTeachersDto.searchBy === 'phone')
      queryBuilder.andWhere('teacher.phone LIKE :phone', { phone: `%${findTeachersDto.phone}%` });

    return await queryBuilder.limit(findTeachersDto.getTake()).orderBy('teacher.createdDate', 'DESC').getManyAndCount();
  }

  async findOneByTeacherId(teacherId: number, centerId: number) {
    return await this.teacherRepository.findOneBy({ id: teacherId, centerId });
  }
}
