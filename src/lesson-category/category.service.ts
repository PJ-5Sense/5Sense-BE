import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>) {}

  async getCategories(centerId: number) {
    // centerId가 지정된 카테고리와 centerId가 null인 카테고리를 함께 검색합니다.
    return await this.categoryRepository
      .createQueryBuilder('category')
      .select(['category.id', 'category.name', 'category.parentId'])
      .distinct()
      .innerJoin('category.sessionCategories', 'session')
      .innerJoin('category.durationCategories', 'duration')
      .where('session.centerId = :centerId', { centerId })
      .orWhere('category.centerId IS NULL', { centerId: null })
      .getMany();
  }
}
