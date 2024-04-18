import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { SessionLessonService } from './session.lesson.service';
import { CurrentUser } from '../../common/decorator/user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerCreateSessionLesson, SwaggerSessionLessonDetail } from '../../swagger/session-lesson.swagger';
import { UpdateSessionLessonDTO } from './dto/request/update-session-lesson.dto';
import { CreateSessionLessonDTO } from './dto/request/create-session-lesson.dto';
import { SwaggerCloseLesson, SwaggerUpdateLesson } from 'src/swagger/duration-lesson.swagger';

@ApiTags('Session Lesson - 회차반')
@Controller('session-lessons')
export class SessionLessonController {
  constructor(private readonly sessionLessonService: SessionLessonService) {}

  @SwaggerCreateSessionLesson()
  @Post('')
  async create(@Body() sessionLessonDTO: CreateSessionLessonDTO, @CurrentUser('centerId') centerId: number) {
    await this.sessionLessonService.create(sessionLessonDTO, centerId);

    return {
      success: true,
      message: `The Session lesson has been successfully registered`,
    };
  }

  @SwaggerSessionLessonDetail()
  @Get(':lessonId/details')
  async getOne(@CurrentUser('centerId') centerId: number, @Param('lessonId') lessonId: number) {
    return {
      success: true,
      message: `Successfully retrieved the details of the session lesson information`,
      data: await this.sessionLessonService.getOne(lessonId, centerId),
    };
  }

  @SwaggerUpdateLesson()
  @Put('/:lessonId')
  async updateLesson(
    @Param('lessonId') lessonId: number,
    @Body() updateLessonDTO: UpdateSessionLessonDTO,
    @CurrentUser('centerId') centerId: number,
  ) {
    await this.sessionLessonService.update(updateLessonDTO, lessonId, centerId);

    return {
      success: true,
      message: `The Session lesson has been successfully updated`,
    };
  }

  @SwaggerCloseLesson()
  @Patch('/:lessonId/close')
  async closeLesson(@Param('lessonId') lessonId: number, @CurrentUser('centerId') centerId: number) {
    await this.sessionLessonService.closeLesson(lessonId, centerId);

    return {
      success: true,
      message: `The lesson has been successfully closed`,
    };
  }
}
