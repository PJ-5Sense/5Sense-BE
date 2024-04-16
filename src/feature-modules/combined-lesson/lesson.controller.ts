import { Controller, Get, Query, Param } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { FindManyByDateDTO, FindManyByFilterDTO } from './dto/request/find-many-lesson.dto';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerFindByFilterLesson } from 'src/swagger/combined-lesson.swagger';

@ApiTags('Lesson - 클래스(기간/회차 통합)')
@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

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

  @Get('/:year/:month')
  async getLessonsByDate(@Param() findManyLessonDTO: FindManyByDateDTO, @CurrentUser('centerId') centerId: number) {
    return {
      success: true,
      message: `Successfully retrieved the lesson list by date`,
      data: await this.lessonService.getLessonsByDate(findManyLessonDTO, centerId),
    };
  }
}
