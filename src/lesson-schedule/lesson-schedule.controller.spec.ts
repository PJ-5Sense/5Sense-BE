import { Test, TestingModule } from '@nestjs/testing';
import { LessonScheduleController } from './lesson-schedule.controller';
import { LessonScheduleService } from './lesson-schedule.service';

describe('LessonScheduleController', () => {
  let controller: LessonScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonScheduleController],
      providers: [LessonScheduleService],
    }).compile();

    controller = module.get<LessonScheduleController>(LessonScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
