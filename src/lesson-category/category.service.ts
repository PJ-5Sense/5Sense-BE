import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryType } from './category.type';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>) {}

  async getCategories(centerId: number) {
    // centerId가 지정된 카테고리와 centerId가 null인 카테고리를 함께 검색합니다.
    const durationCategories = await this.categoryRepository
      .createQueryBuilder('category')
      .select(['category.id', 'category.name', 'category.parentId', 'category.parentName'])
      .innerJoin('category.durationCategories', 'duration')
      .where('(category.centerId = :centerId OR category.centerId IS NULL)', { centerId })
      .distinct()
      .getMany();

    const sessionCategories = await this.categoryRepository
      .createQueryBuilder('category')
      .select(['category.id', 'category.name', 'category.parentId', 'category.parentName'])
      .innerJoin('category.sessionCategories', 'session')
      .where('(category.centerId = :centerId OR category.centerId IS NULL)', { centerId })
      .distinct()
      .getMany();

    const categories = [...new Set([...durationCategories, ...sessionCategories])];

    const mainCategory: CategoryType[] = [];
    const subCategory: CategoryType[] = [];

    categories.forEach(category => {
      if (category.parentId && category.parentName) {
        if (!mainCategory.some(mainCategory => mainCategory.id === category.parentId)) {
          mainCategory.push({ id: category.parentId, name: category.parentName });
        }
        if (!subCategory.some(subCategory => subCategory.id === category.id)) {
          subCategory.push({ id: category.id, name: category.name });
        }
      }
    });

    return { mainCategory, subCategory };
  }
}
