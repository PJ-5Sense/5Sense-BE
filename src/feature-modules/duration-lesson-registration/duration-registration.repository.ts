import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DurationLessonRegistrationEntity } from './entity/duration-registration.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DurationLessonRegistrationRepository {
  constructor(
    @InjectRepository(DurationLessonRegistrationEntity)
    private readonly durationRegistrationDAO: Repository<DurationLessonRegistrationEntity>,
  ) {}
}
