import { Test, TestingModule } from '@nestjs/testing';
import { LessonCategoryController } from './lesson-category.controller';
import { LessonCategoryService } from './lesson-category.service';

describe('LessonCategoryController', () => {
  let controller: LessonCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonCategoryController],
      providers: [LessonCategoryService],
    }).compile();

    controller = module.get<LessonCategoryController>(LessonCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
