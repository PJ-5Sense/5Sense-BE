import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDTO } from './dto/create-lesson.dto';
import { User } from 'src/common/decorator/user.decorator';
import { FindManyByDateDTO, FindManyByFilterDTO } from './dto/find-many-lesson.dto';

@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  async create(@Body() createLessonDto: CreateLessonDTO, @User('centerId') centerId: number) {
    return {
      success: true,
      message: `The Lesson has been successfully registered`,
      data: await this.lessonService.create(createLessonDto, centerId),
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

  @Get('filters')
  async getLessonsByFilter(@Query() findManyByFilterDTO: FindManyByFilterDTO, @User('centerId') centerId: number) {
    return {
      success: true,
      message: `Successfully retrieved the Lesson list by applying filter`,
      data: await this.lessonService.getFilteredLessons(findManyByFilterDTO, centerId),
    };
  }
}
