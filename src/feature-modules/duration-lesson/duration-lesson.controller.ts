import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateDurationLessonDTO } from './dto/request/create-duration-lesson.dto';
import { CurrentUser } from '../../common/decorator/user.decorator';
import { DurationLessonService } from './duration.lesson.service';
import { ApiTags } from '@nestjs/swagger';
import {
  SwaggerCloseDurationLesson,
  SwaggerCreateDurationLesson,
  SwaggerFindManyDurationLesson,
  SwaggerDurationLessonDetail,
  SwaggerUpdateDurationLesson,
} from '../../swagger/duration-lesson.swagger';
import { UpdateDurationLessonDTO } from './dto/request/update-duration-lesson-dto';

@ApiTags('Duration Lesson - 기간반')
@Controller('duration-lessons')
export class DurationLessonController {
  constructor(private readonly durationLessonService: DurationLessonService) {}
  @SwaggerCreateDurationLesson()
  @Post('')
  async createDurationLesson(
    @Body() durationLessonDTO: CreateDurationLessonDTO,
    @CurrentUser('centerId') centerId: number,
  ) {
    await this.durationLessonService.create(durationLessonDTO, centerId);

    return {
      success: true,
      message: `The Duration lesson has been successfully registered`,
    };
  }

  @SwaggerFindManyDurationLesson()
  @Get()
  async findManyLesson(@CurrentUser('centerId') centerId: number) {
    return {
      success: true,
      message: `Successfully retrieved the list of duration lesson information`,
      data: await this.durationLessonService.findMany(centerId),
    };
  }

  @SwaggerDurationLessonDetail()
  @Get(':lessonId/details')
  async getLessonDetails(@CurrentUser('centerId') centerId: number, @Param('lessonId') lessonId: number) {
    return {
      success: true,
      message: `Successfully retrieved the details of the duration lesson information`,
      data: await this.durationLessonService.getOne(lessonId, centerId),
    };
  }

  @SwaggerUpdateDurationLesson()
  @Put('/:lessonId')
  async updateLesson(
    @Param('lessonId') lessonId: number,
    @Body() updateLessonDTO: UpdateDurationLessonDTO,
    @CurrentUser('centerId') centerId: number,
  ) {
    await this.durationLessonService.updateLesson(updateLessonDTO, lessonId, centerId);

    return {
      success: true,
      message: `The Duration lesson has been successfully updated`,
    };
  }

  @SwaggerCloseDurationLesson()
  @Patch('/:lessonId/close')
  async closeLesson(@Param('lessonId') lessonId: number, @CurrentUser('centerId') centerId: number) {
    await this.durationLessonService.closeLesson(lessonId, centerId);

    return {
      success: true,
      message: `The Duration lesson has been successfully closed`,
    };
  }
}
