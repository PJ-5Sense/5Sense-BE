import { CenterEntity } from 'src/center/entities/center.entity';
import { HardDeleteBaseEntity } from 'src/database/base.entity';
import { LessonEntity } from 'src/lesson/entities/lesson.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'teacher' })
export class TeacherEntity extends HardDeleteBaseEntity {
  @Column({ comment: '강사 이름' })
  name: string;

  @Column({ comment: '강사 휴대전화 번호' })
  phone: string;

  @Column({ comment: '강사 성별' })
  gender: string;

  @Column({ comment: '프로필 이미지' })
  profile: string;

  @ManyToOne(() => CenterEntity, center => center.id, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'center_id' })
  center: number;

  @OneToMany(() => LessonEntity, lesson => lesson.teacher)
  lessons: LessonEntity[];
}
