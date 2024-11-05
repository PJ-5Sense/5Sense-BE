import { Body, Controller, Post } from '@nestjs/common';
import { SessionLessonScheduleService } from './lesson-schedule.service';
import { CreateSessionScheduleDTO } from './dto/request/create-session-schedule.dto';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerCreateSessionLessonSchedule } from 'src/swagger/session-lesson.swagger';

@ApiTags('Session Lesson Schedule - 회차반 일정')
@Controller('session-lesson-schedules')
export class SessionLessonScheduleController {
  constructor(private readonly lessonScheduleService: SessionLessonScheduleService) {}

  @SwaggerCreateSessionLessonSchedule()
  @Post()
  async create(@Body() createSessionScheduleDTO: CreateSessionScheduleDTO) {
    await this.lessonScheduleService.create(createSessionScheduleDTO);

    return {
      success: true,
      message: 'Session lesson schedule has been successfully registered',
    };
  }
}
