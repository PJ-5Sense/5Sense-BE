import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DurationLessonScheduleEntity } from '../entity/duration-lesson-schedule.entity';
import { DurationScheduleDTO } from '../../lesson/dto/create-lesson.dto';
import { UpdateDurationScheduleDTO } from '../../lesson/dto/update-lesson.dto';

@Injectable()
export class DurationScheduleRepository {
  constructor(
    @InjectRepository(DurationLessonScheduleEntity)
    private readonly durationScheduleDAO: Repository<DurationLessonScheduleEntity>,
  ) {}

  async create(lessonId: number, schedules: DurationScheduleDTO[]) {
    for (const schedule of schedules) {
      await this.durationScheduleDAO.save(
        this.durationScheduleDAO.create({
          ...schedule,
          lessonId,
        }),
      );
    }
  }

  async update(lessonId: number, schedules: UpdateDurationScheduleDTO[]) {
    schedules.forEach(async schedule => {
      const { id, ...scheduleData } = schedule;
      await this.durationScheduleDAO
        .createQueryBuilder()
        .update()
        .set({ ...scheduleData })
        .where('id = :id', { id })
        .andWhere('lessonId = :lessonId', { lessonId })
        .execute();
    });
  }
}
