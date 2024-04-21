import { Controller } from '@nestjs/common';
import { LessonScheduleService } from './lesson-schedule.service';

@Controller('lesson-schedules')
export class LessonScheduleController {
  constructor(private readonly lessonScheduleService: LessonScheduleService) {}

  // session 스케줄 등록
  // center, teacher, lesson 각 아이디가 필요함
}
