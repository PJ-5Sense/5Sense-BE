import { HardDeleteBaseEntity } from 'src/database/base.entity';
import { LessonEntity } from 'src/lesson/entities/lesson.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'lesson_category' })
export class LessonCategoryEntity extends HardDeleteBaseEntity {
  @ManyToOne(() => LessonEntity, lesson => lesson.categories)
  lesson: LessonEntity;

  @ManyToOne(() => LessonCategoryEntity, category => category.id, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  category: LessonCategoryEntity;

  @Column({
    name: 'parent_id',
    comment: '카테고리가 대분류 = null, 소분류 일 경우 pk값을 parent_id로 사용',
    nullable: true,
    unsigned: true,
    default: null,
  })
  parentId: number;

  @Column({ comment: '카테고리 이름' })
  name: string;
}
