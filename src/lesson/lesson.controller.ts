import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDTO } from './dto/create-lesson.dto';
import { User } from 'src/common/decorator/user.decorator';
import { FindManyByDateDTO, FindManyByFilterDTO } from './dto/find-many-lesson.dto';
import { FindOneLessonDTO } from './dto/find-one-lesson.dto';

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
      message: `Successfully retrieved the Lesson list by applying filter`,
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
      message: `Successfully retrieved the details of the Lesson information`,
      data: await this.lessonService.getLessonDetails(lessonId, centerId, findOneLessonDTO),
    };
  }

  @Get(':lessonId/edit')
  async findLessonInfoForEdit(
    @User('centerId') centerId: number,
    @Param('lessonId') lessonId: number,
    @Query() findOneLessonDTO: FindOneLessonDTO,
  ) {
    return {
      success: true,
      message: `Successfully retrieved the Lesson information for editing`,
      data: await this.lessonService.getLessonForEdit(lessonId, centerId, findOneLessonDTO),
    };
  }

  @Get('/:year/:month')
  async getLessonsByDate(@Param() findManyLessonDTO: FindManyByDateDTO, @User('centerId') centerId: number) {
    return {
      success: true,
      message: `Successfully retrieved the Lesson list by date`,
      data: await this.lessonService.getLessonsByDate(findManyLessonDTO, centerId),
    };
  }
}
