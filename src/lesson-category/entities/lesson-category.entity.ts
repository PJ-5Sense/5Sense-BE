import { CategoryEntity } from 'src/category/entities/category.entity';
import { HardDeleteBaseEntity } from 'src/database/base.entity';
import { LessonEntity } from 'src/lesson/entities/lesson.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'lesson_category' })
export class LessonCategoryEntity extends HardDeleteBaseEntity {
  @ManyToOne(() => CategoryEntity, category => category.id, { nullable: false })
  @JoinColumn({ name: 'category_id' })
  category: number;

  @ManyToOne(() => LessonEntity, lesson => lesson.id, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'lesson_id' })
  lesson: number;
}
