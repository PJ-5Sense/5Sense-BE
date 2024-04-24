import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionLessonScheduleEntity } from './entity/session-lesson-schedule.entity';

@Injectable()
export class SessionScheduleRepository {
  constructor(
    @InjectRepository(SessionLessonScheduleEntity)
    private readonly sessionScheduleDAO: Repository<SessionLessonScheduleEntity>,
  ) {}

  async create(registrationData: {
    sessionDate: Date;
    startTime: string;
    endTime: string;
    roomId: number;
    sessionRegistrationId: number;
  }) {
    const schedule = this.sessionScheduleDAO.create({
      ...registrationData,
    });

    return await this.sessionScheduleDAO.save(schedule);
  }
}
