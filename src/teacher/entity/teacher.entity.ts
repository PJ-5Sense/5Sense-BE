import { CenterEntity } from 'src/center/entity/center.entity';
import { HardDeleteBaseEntity } from 'src/database/base.entity';
import { DurationLessonEntity } from 'src/lesson/entity/duration/duration-lesson.entity';
import { SessionLessonEntity } from 'src/lesson/entity/session/session-lesson.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'teacher' })
export class TeacherEntity extends HardDeleteBaseEntity {
  @Column({ comment: '강사 이름' })
  name: string;

  @Column({ comment: '강사 휴대전화 번호' })
  phone: string;

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
