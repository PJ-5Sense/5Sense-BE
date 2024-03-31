import { Controller, Get, Post, Body, Query, Param, Put, Delete, Patch } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDTO } from './dto/create-lesson.dto';
import { User } from 'src/common/decorator/user.decorator';
import { FindManyByDateDTO, FindManyByFilterDTO } from './dto/find-many-lesson.dto';
import { FindOneLessonDTO } from './dto/find-one-lesson.dto';
import { UpdateLessonDTO } from './dto/update-lesson.dto';
import { CloseLessonDTO } from './dto/close-lesson.dto';

@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  async createLesson(@Body() createLessonDto: CreateLessonDTO, @User('centerId') centerId: number) {
    await this.lessonService.createLesson(createLessonDto, centerId);

    return {
      success: true,
      message: `The Lesson has been successfully registered`,
    };
  }

  @Get('filters')
  async findLessonsByFilter(@Query() findManyByFilterDTO: FindManyByFilterDTO, @User('centerId') centerId: number) {
    return {
      success: true,
      message: `Successfully retrieved the lesson list by applying filter`,
      data: await this.lessonService.getFilteredLessons(findManyByFilterDTO, centerId),
    };
  }

  @Get(':lessonId/details')
  async findLessonDetails(
    @User('centerId') centerId: number,
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
  async getLessonsByDate(@Param() findManyLessonDTO: FindManyByDateDTO, @User('centerId') centerId: number) {
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
    @User('centerId') centerId: number,
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
    @User('centerId') centerId: number,
  ) {
    await this.lessonService.closeLesson(lessonId, centerId, closeLessonDTO.type);

    return {
      success: true,
      message: `The lesson has been successfully closed`,
    };
  }
}
