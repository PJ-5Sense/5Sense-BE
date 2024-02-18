import { Controller, Get, Post, Body } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDTO } from './dto/create-lesson.dto';
import { User } from 'src/common/decorator/user.decorator';
import { JwtPayload } from 'src/auth/types/jwt-payload.type';

@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  async create(@Body() createLessonDto: CreateLessonDTO, @User('centerId') centerId: number) {
    // return this.lessonService.create(createLessonDto);

    return {
      success: true,
      message: `성공적으로 진행함`,
      data: await this.lessonService.create(createLessonDto, centerId),
    };
  }

  @Get()
  async findMany() {}
}
