import { HardDeleteBaseEntity } from 'src/database/base.entity';
import { DurationLessonEntity } from 'src/lesson/entities/duration-lesson.entity';
import { SessionLessonEntity } from 'src/lesson/entities/session-lesson.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'category' })
export class CategoryEntity extends HardDeleteBaseEntity {
  @Column()
  name: string;

  // Relation columns
  @Column({ name: 'center_id', nullable: true, default: null })
  centerId: number; // 물리적 관계설정이 필요없다고 느껴서 번호만 저장하여 검색

  @Column({
    name: 'parent_id',
    comment: '카테고리가 대분류 = null, 소분류 일 경우 pk값을 parent_id로 사용',
    nullable: true,
    unsigned: true,
    default: null,
  })
  parentId: number;

  // Relations
  @OneToMany(() => SessionLessonEntity, category => category.category)
  sessionCategories: SessionLessonEntity[];

  @OneToMany(() => DurationLessonEntity, category => category.category)
  durationCategories: DurationLessonEntity[];

  @ManyToOne(() => CategoryEntity, category => category.id, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_id' })
  category: CategoryEntity;
}
