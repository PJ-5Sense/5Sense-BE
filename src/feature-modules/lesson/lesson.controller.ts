import { Controller, Get, Post, Body, Query, Param, Put, Patch } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { FindManyByDateDTO, FindManyByFilterDTO } from './dto/request/find-many-lesson.dto';
import { FindOneLessonDTO } from './dto/request/find-one-lesson.dto';
import { UpdateLessonDTO } from './dto/request/update-lesson.dto';
import { CloseLessonDTO } from './dto/request/close-lesson.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  SwaggerCreateDurationLesson,
  SwaggerCreateSessionLesson,
  SwaggerFindByFilterLesson,
  SwaggerLessonDetail,
} from 'src/swagger/lesson.swagger';
import { DurationLessonDTO } from './dto/request/create-duration-lesson.dto';
import { SessionLessonDTO } from './dto/request/create-session-lesson.dto';

@ApiTags('Lesson - 클래스')
@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @SwaggerCreateDurationLesson()
  @Post('duration')
  async createDurationLesson(@Body() durationLessonDTO: DurationLessonDTO, @CurrentUser('centerId') centerId: number) {
    await this.lessonService.createDurationLesson(durationLessonDTO, centerId);

    return {
      success: true,
      message: `The Lesson has been successfully registered`,
    };
  }

  @SwaggerCreateSessionLesson()
  @Post('session')
  async createSessionLesson(@Body() sessionLessonDTO: SessionLessonDTO, @CurrentUser('centerId') centerId: number) {
    await this.lessonService.createSessionLesson(sessionLessonDTO, centerId);

    return {
      success: true,
      message: `The Lesson has been successfully registered`,
    };
  }

  @SwaggerFindByFilterLesson()
  @Get('filters')
  async findLessonsByFilter(
    @Query() findManyByFilterDTO: FindManyByFilterDTO,
    @CurrentUser('centerId') centerId: number,
  ) {
    return {
      success: true,
      message: `Successfully retrieved the lesson list by applying filter`,
      data: await this.lessonService.getFilteredLessons(findManyByFilterDTO, centerId),
    };
  }

  @SwaggerLessonDetail()
  @Get(':lessonId/details')
  async findLessonDetails(
    @CurrentUser('centerId') centerId: number,
    @Param('lessonId') lessonId: number,
    @Query() findOneLessonDTO: FindOneLessonDTO,
  ) {
    return {
      success: true,
      message: `Successfully retrieved the details of the ${findOneLessonDTO.type} lesson information`,
      data: await this.lessonService.getLessonDetails(lessonId, centerId, findOneLessonDTO),
    };
  }

  @Get('/:year/:month')
  async getLessonsByDate(@Param() findManyLessonDTO: FindManyByDateDTO, @CurrentUser('centerId') centerId: number) {
    return {
      success: true,
      message: `Successfully retrieved the lesson list by date`,
      data: await this.lessonService.getLessonsByDate(findManyLessonDTO, centerId),
    };
  }

  @Put('/:lessonId')
  async updateLesson(
    @Param('lessonId') lessonId: number,
    @Body() updateLessonDTO: UpdateLessonDTO,
    @CurrentUser('centerId') centerId: number,
  ) {
    await this.lessonService.updateLesson(updateLessonDTO, lessonId, centerId);

    return {
      success: true,
      message: `The ${updateLessonDTO.type} lesson has been successfully updated`,
    };
  }

  @Patch('/:lessonId/close')
  async closeLesson(
    @Param('lessonId') lessonId: number,
    @Query() closeLessonDTO: CloseLessonDTO,
    @CurrentUser('centerId') centerId: number,
  ) {
    await this.lessonService.closeLesson(lessonId, centerId, closeLessonDTO.type);

    return {
      success: true,
      message: `The lesson has been successfully closed`,
    };
  }
}
