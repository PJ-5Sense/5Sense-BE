import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DurationLessonScheduleEntity } from '../entity/duration-lesson-schedule.entity';

@Injectable()
export class ScheduleRepository {
  constructor(
    @InjectRepository(DurationLessonScheduleEntity)
    private readonly durationScheduleDAO: Repository<DurationLessonScheduleEntity>,
  ) {}
}
