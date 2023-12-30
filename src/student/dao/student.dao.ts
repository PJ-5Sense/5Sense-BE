import { Injectable } from '@nestjs/common';
import { IStudentDao } from './student.dao.interface';
import { CreateStudentDto } from '../dto/create-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from '../entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentDaoImpl implements IStudentDao {
  constructor(@InjectRepository(StudentEntity) private readonly studentRepository: Repository<StudentEntity>) {}
  async create(createStudentDto: CreateStudentDto, centerId: number) {
    return await this.studentRepository.save({ ...createStudentDto, centerId });
  }

  async findExistingStudent(name: string, phone: string) {
    return await this.studentRepository.findOneBy({ name, phone });
  }
}
