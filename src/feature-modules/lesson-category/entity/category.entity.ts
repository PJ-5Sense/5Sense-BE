import { DurationLessonEntity } from 'src/feature-modules/duration-lesson/duration-lesson.entity';
import { SessionLessonEntity } from 'src/feature-modules/session-lesson/session-lesson.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'category' })
export class CategoryEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column()
  name: string;

  @Column({
    name: 'parent_id',
    comment: '카테고리가 대분류라면 null, 소분류 일 경우 pk값을 parent_id로 사용',
    nullable: true,
    unsigned: true,
    default: null,
  })
  parentId: number;

  @Column({
    name: 'parent_name',
    comment: '카테고리가 대분류라면 null, 소분류 일 경우 카테고리 대분류 이름을 사용',
    nullable: true,
    default: null,
  })
  parentName: string;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  // Relation columns
  @Column({ name: 'center_id', nullable: true, default: null })
  centerId: number; // 물리적 관계설정이 필요없다고 느껴서 번호만 저장하여 검색

  // Relations
  @OneToMany(() => SessionLessonEntity, category => category.category)
  sessionCategories: SessionLessonEntity[];

  @OneToMany(() => DurationLessonEntity, category => category.category)
  durationCategories: DurationLessonEntity[];
}
