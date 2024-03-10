import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>) {}

  async getCategories() {
    return (await this.categoryRepository.find()).map(category => {
      return { id: category.id, name: category.name, parentId: category.parentId };
    });
  }
}
