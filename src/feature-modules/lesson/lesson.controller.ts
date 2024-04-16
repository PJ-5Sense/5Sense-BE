import { Controller, Get, Post, Body, Query, Param, Put, Patch } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { FindManyByDateDTO, FindManyByFilterDTO } from './dto/request/find-many-lesson.dto';
import { FindOneLessonDTO } from './dto/request/find-one-lesson.dto';
import { UpdateLessonDTO } from './dto/request/update-lesson.dto';
import { CloseLessonDTO } from './dto/request/close-lesson.dto';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerCreateLesson, SwaggerFindByFilterLesson, SwaggerLessonDetail } from 'src/swagger/lesson.swagger';
import { CreateLessonDTO } from './dto/request/create-lesson.dto';

@ApiTags('Lesson - 클래스')
@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @SwaggerCreateLesson()
  @Post()
  async createLesson(@Body() createLessonDTO: CreateLessonDTO, @CurrentUser('centerId') centerId: number) {
    await this.lessonService.createLesson(createLessonDTO, centerId);

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
