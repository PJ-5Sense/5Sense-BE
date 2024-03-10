import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LessonScheduleService } from './lesson-schedule.service';
import { CreateLessonScheduleDto } from './dto/create-lesson-schedule.dto';
import { UpdateLessonScheduleDto } from './dto/update-lesson-schedule.dto';

@Controller('lesson-schedule')
export class LessonScheduleController {
  constructor(private readonly lessonScheduleService: LessonScheduleService) {}

  @Post()
  create(@Body() createLessonScheduleDto: CreateLessonScheduleDto) {
    return this.lessonScheduleService.create(createLessonScheduleDto);
  }

  @Get()
  findAll() {
    return this.lessonScheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonScheduleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonScheduleDto: UpdateLessonScheduleDto) {
    return this.lessonScheduleService.update(+id, updateLessonScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonScheduleService.remove(+id);
  }
}
