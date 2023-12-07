import { Test, TestingModule } from '@nestjs/testing';
import { LessonCategoryService } from './lesson-category.service';

describe('LessonCategoryService', () => {
  let service: LessonCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessonCategoryService],
    }).compile();

    service = module.get<LessonCategoryService>(LessonCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
