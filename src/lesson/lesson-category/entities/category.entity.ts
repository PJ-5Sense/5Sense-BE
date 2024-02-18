import { HardDeleteBaseEntity } from 'src/database/base.entity';
import { LessonEntity } from 'src/lesson/entities/lesson.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'category' })
export class CategoryEntity extends HardDeleteBaseEntity {
  @Column()
  name: string;

  @Column({
    name: 'parent_id',
    comment: '카테고리가 대분류 = null, 소분류 일 경우 pk값을 parent_id로 사용',
    nullable: true,
    unsigned: true,
    default: null,
  })
  parentId: number;

  @ManyToOne(() => CategoryEntity, category => category.id, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_id' })
  category: CategoryEntity;

  @Column({ name: 'center_id', nullable: true, default: null })
  centerId: number;

  @OneToMany(() => LessonEntity, category => category.category)
  categories: LessonEntity[];
}
