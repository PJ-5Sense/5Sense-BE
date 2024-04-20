import { Controller, Get } from '@nestjs/common';
import { LessonCategoryService } from './category.service';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { SwaggerLessonCategory } from 'src/swagger/lesson-category.swagger';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Lesson Category - 카테고리')
@Controller('lesson-categories')
export class CategoryController {
  constructor(private readonly lessonCategoryService: LessonCategoryService) {}

  @SwaggerLessonCategory()
  @Get()
  async getCategories(@CurrentUser('centerId') centerId: number) {
    return {
      success: true,
      message: 'Successfully retrieved the Category list',
      data: await this.lessonCategoryService.getCategories(centerId),
    };
  }
}
