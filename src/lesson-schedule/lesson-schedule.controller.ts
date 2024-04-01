import { Controller, Get, Post, Query } from '@nestjs/common';
import { LessonScheduleService } from './lesson-schedule.service';
import { GetDailySchedulesDTO } from './dto/get-daily-schedules.dto';
import { GetRangeSchedulesDTO } from './dto/get-range-schedule.dto';
import { CurrentUser } from '../common/decorator/user.decorator';

@Controller('lesson-schedules')
export class LessonScheduleController {
  constructor(private readonly lessonScheduleService: LessonScheduleService) {}

  @Get('range')
  // TODO : 학원의 장사 시간을 반영해야함
  async getSchedulesWithinRange(
    @Query() getRangeSchedulesDTO: GetRangeSchedulesDTO,
    @CurrentUser('centerId') centerId: number,
  ) {
    // 기간, 시간, 요일 -> 기간반
    // 기간(하루 요일) -> 회차반
    // 가져올때 월 수 금은 19~21시까지 잠겨있는데, 월 금으로 바꾸면 19~21시 사용이 가능하면?
    // 수업이 가능한 룸만 보여지지만? 실제로 클릭해서 시간을 바꿀 수 있다면, 전체 룸에 기간동안의 시간 정보를 주는게 맞지않나?
    // 질문 정리 1. 기간, 시간, 요일 선택 후 보여지는 룸의 정보는 예약이 가능한 룸들만 보여주는것인가요? 아님 그 기간에 대한 룸에 대한 정보를 보여주는건가요?
    // 후자를 질문한 이유는 룸정보를 받은 뒤 시간대를 클릭해서 변경이 가능하다고 말해줬음, 이런 경우에는 보여주는게 그 기간에 대한 룸의 정보로 바뀌여야함
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
