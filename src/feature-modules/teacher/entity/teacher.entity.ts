import { CenterEntity } from 'src/feature-modules/center/entity/center.entity';
import { DurationLessonEntity } from 'src/feature-modules/lesson/entity/duration-lesson.entity';
import { SessionLessonEntity } from 'src/feature-modules/lesson/entity/session-lesson.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'teacher' })
export class TeacherEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ comment: '강사 이름' })
  name: string;

  @Column({ comment: '강사 휴대전화 번호' })
  phone: string;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  // Relation columns
  @Column({ name: 'center_id', type: 'int', unsigned: true, nullable: false })
  centerId: number;

  // Relations
  @ManyToOne(() => CenterEntity, center => center.id, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'center_id' })
  center: CenterEntity;

  @OneToMany(() => DurationLessonEntity, durationLesson => durationLesson.teacher)
  durationLessons: DurationLessonEntity[];

  @OneToMany(() => SessionLessonEntity, sessionLesson => sessionLesson.teacher)
  sessionLessons: SessionLessonEntity[];
}
