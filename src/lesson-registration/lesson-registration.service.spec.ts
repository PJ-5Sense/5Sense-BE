import { Test, TestingModule } from '@nestjs/testing';
import { LessonRegistrationService } from './lesson-registration.service';

describe('LessonRegistrationService', () => {
  let service: LessonRegistrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessonRegistrationService],
    }).compile();

    service = module.get<LessonRegistrationService>(LessonRegistrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
