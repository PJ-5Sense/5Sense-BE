import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionLessonRegistrationEntity } from './entity/session-registration.entity';

@Injectable()
export class LessonRegistrationRepository {
  constructor(
    @InjectRepository(SessionLessonRegistrationEntity)
    private readonly sessionRegistrationDAO: Repository<SessionLessonRegistrationEntity>,
  ) {}
}
