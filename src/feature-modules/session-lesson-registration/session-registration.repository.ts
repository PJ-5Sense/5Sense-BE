import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionLessonRegistrationEntity } from './entity/session-registration.entity';
import { CreateSessionRegistrationDTO } from './dto/request/create-registration.dto';

@Injectable()
export class SessionLessonRegistrationRepository {
  constructor(
    @InjectRepository(SessionLessonRegistrationEntity)
    private readonly sessionRegistrationDAO: Repository<SessionLessonRegistrationEntity>,
  ) {}

  async create(createSessionRegistrationDTO: CreateSessionRegistrationDTO) {
    const registration = this.sessionRegistrationDAO.create({
      studentId: createSessionRegistrationDTO.studentId,
      lessonId: createSessionRegistrationDTO.lessonId,
    });

    return await this.sessionRegistrationDAO.save(registration);
  }

  async findOne(lessonId: number, studentId: number) {
    return await this.sessionRegistrationDAO.findOne({
      where: { lessonId, studentId },
      relations: { sessionSchedules: true },
    });
  }
}
