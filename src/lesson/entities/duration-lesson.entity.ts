import { HardDeleteBaseEntity } from 'src/database/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { LessonEntity } from './lesson.entity';

// 1:N으로 데이터 설계 변경해야함
@Entity({ name: 'duration-lesson' })
export class DurationLessonEntity extends HardDeleteBaseEntity {
  @Column({ type: 'datetime', precision: 6, name: 'start_date', comment: '클래스 시작일' })
  startDate: Date;

  @Column({ type: 'datetime', precision: 6, name: 'end_date', comment: '클래스 종료일' })
  endDate: Date;

  @Column({ type: 'time', name: 'start_time', comment: '클래스 시작시간' })
  startTime: string;

  @Column({ type: 'time', name: 'end_time', comment: '클래스 종료시간' })
  endTime: string;

  @Column({ name: 'repeat_date', comment: '반복 요일 ex) 월, 화, 수' })
  repeatDate: string;

  @Column({ name: 'lesson_id', nullable: false, unsigned: true })
  lessonId: number;

  @ManyToOne(() => LessonEntity, lesson => lesson.id, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'lesson_id' })
  lesson: LessonEntity;
}
