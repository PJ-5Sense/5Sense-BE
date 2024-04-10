import { Controller, Get, Post, Query } from '@nestjs/common';
import { LessonScheduleService } from './lesson-schedule.service';
import { GetDailySchedulesDTO } from './dto/get-daily-schedules.dto';
import { GetRangeSchedulesDTO } from './dto/get-range-schedule.dto';
import { CurrentUser } from '../../common/decorator/user.decorator';

@Controller('lesson-schedules')
export class LessonScheduleController {
  constructor(private readonly lessonScheduleService: LessonScheduleService) {}

  // 목록 가져오기 클래스 관리에서 클래스 추가할떄 작업
  // 스케쥴 목록 가져오기
  @Get('range')
  // TODO : 학원의 장사 시간을 반영해야함
  async getSchedulesWithinRange(
    @Query() getRangeSchedulesDTO: GetRangeSchedulesDTO,
    @CurrentUser('centerId') centerId: number,
  ) {
    return await this.lessonScheduleService.getSchedulesWithinRange(getRangeSchedulesDTO, centerId);
    // 기간, 시간, 요일 -> 기간반
    // 기간(하루 요일) -> 회차반
    // 해당 기간과 요일로 전체정보를 가져오도록 함
  }

  @Get('daily')
  // TODO : 학원의 장사 시간을 반영해야함
  async getDailySchedules(
    @Query() getDailySchedulesDTO: GetDailySchedulesDTO,
    @CurrentUser('centerId') centerId: number,
  ) {
    // 기간(하루 요일) -> 회차반
  }
}
