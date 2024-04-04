import { Injectable } from '@nestjs/common';
import { DurationScheduleDTO } from '../lesson/dto/create-lesson.dto';
import { DurationScheduleRepository } from './repository/duration-schedule.repository';
import { SessionScheduleRepository } from './repository/session-schedule.repository';
import { UpdateDurationScheduleDTO } from '../lesson/dto/update-lesson.dto';
import { GetRangeSchedulesDTO } from './dto/get-range-schedule.dto';

@Injectable()
export class LessonScheduleService {
  constructor(
    private readonly durationScheduleRepository: DurationScheduleRepository,
    private readonly sessionScheduleRepository: SessionScheduleRepository,
  ) {}

  async createDurationSchedules(lessonId: number, schedules: DurationScheduleDTO[]) {
    await this.durationScheduleRepository.create(lessonId, schedules);
  }

  async updateDurationSchedules(lessonId: number, schedules: UpdateDurationScheduleDTO[]) {
    await this.durationScheduleRepository.update(lessonId, schedules);
  }

  async getSchedulesWithinRange(getRangeSchedulesDTO: GetRangeSchedulesDTO, centerId: number) {}
}
