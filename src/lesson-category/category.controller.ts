import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('lesson-categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategories() {
    return {
      success: true,
      message: 'Successfully retrieved the Category list',
      data: await this.categoryService.getCategories(),
    };
  }
}
