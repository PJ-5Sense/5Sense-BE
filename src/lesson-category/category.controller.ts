import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { User } from 'src/common/decorator/user.decorator';

@Controller('lesson-categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategories(@User('centerId') centerId: number) {
    return {
      success: true,
      message: 'Successfully retrieved the Category list',
      data: await this.categoryService.getCategories(centerId),
    };
  }
}
