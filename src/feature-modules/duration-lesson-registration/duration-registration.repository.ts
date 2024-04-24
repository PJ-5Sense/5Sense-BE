import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DurationLessonRegistrationEntity } from './entity/duration-registration.entity';
import { Repository } from 'typeorm';
import { CreateDurationRegistrationDTO } from './dto/request/create-registration.dto';

@Injectable()
export class DurationLessonRegistrationRepository {
  constructor(
    @InjectRepository(DurationLessonRegistrationEntity)
    private readonly durationRegistrationDAO: Repository<DurationLessonRegistrationEntity>,
  ) {}

  async create(createDurationRegistrationDTO: CreateDurationRegistrationDTO) {
    const registration = this.durationRegistrationDAO.create({
      studentId: createDurationRegistrationDTO.studentId,
      lessonId: createDurationRegistrationDTO.lessonId,
    });

    return await this.durationRegistrationDAO.save(registration);
  }
}
