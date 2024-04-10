import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/category.entity';
import { Repository } from 'typeorm';
import { CategoryType } from './type/category.type';

@Injectable()
export class LessonCategoryService {
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
          subCategory.push({ id: category.id, name: category.name, parentId: category.parentId });
        }
      }
    });

    return { mainCategory, subCategory };
  }

  /**
   * 대분류 기타 카테고리가 존재하면 그대로 ID를 사용하고, 존재하지 않을 경우 새로 테이블에 등록 후 ID 사용
   */
  async processEtceteraCategory(categoryName: string) {
    const hasCategory = await this.categoryRepository.findOne({ where: { name: categoryName, parentId: 9 } });

    if (hasCategory) return hasCategory.id;

    return (
      await this.categoryRepository.save({
        name: categoryName,
        parentId: 9,
        parentName: '기타',
      })
    ).id;
  }
}
