import { Injectable } from '@nestjs/common';
import { ScheduleRepository } from './repository/duration-schedule.repository';
import { GetRangeSchedulesDTO } from './dto/get-range-schedule.dto';

@Injectable()
export class LessonScheduleService {
  constructor(private readonly durationScheduleRepository: ScheduleRepository) {}

  async getSchedulesWithinRange(getRangeSchedulesDTO: GetRangeSchedulesDTO, centerId: number) {
    // 기간으로 가져오는건 기간반
    // Business hours center에 추가해서 정보를 가져와야함
    return await this.durationScheduleRepository.getMany(getRangeSchedulesDTO, centerId);
  }
}
