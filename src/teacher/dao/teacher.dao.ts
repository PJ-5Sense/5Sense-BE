import { CreateTeacherDto } from './../dto/reqeust/create-teacher.dto';
import { Injectable } from '@nestjs/common';
import { ITeacherDao } from './teacher.dao.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherEntity } from '../entities/teacher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherDaoImpl implements ITeacherDao {
  constructor(@InjectRepository(TeacherEntity) private readonly teacherRepository: Repository<TeacherEntity>) {}
  async create(createTeacherDto: CreateTeacherDto, centerId: number) {
    return await this.teacherRepository.save({ ...createTeacherDto, centerId });
  }

  async findExistingTeacher(name: string, phone: string, centerId: number) {
    return await this.teacherRepository.findOneBy({ name, phone, centerId });
  }
}
