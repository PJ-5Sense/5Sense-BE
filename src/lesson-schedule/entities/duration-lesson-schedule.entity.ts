import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DurationLessonEntity } from '../../lesson/entities/duration-lesson.entity';
import { LessonRoomEntity } from 'src/lesson-room/entities/lesson-room.entity';

// 1:N으로 데이터 설계 변경해야함
@Entity({ name: 'duration_lesson_schedule' })
export class DurationLessonScheduleEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

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

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  // Relation columns
  @Column({ name: 'lesson_id', nullable: false, unsigned: true })
  lessonId: number;

  @Column({ name: 'room_id', nullable: false, unsigned: true })
  roomId: number;

  // Relations
  @ManyToOne(() => DurationLessonEntity, lesson => lesson.id, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'lesson_id' })
  durationLesson: DurationLessonEntity;

  @ManyToOne(() => LessonRoomEntity, lessonRoom => lessonRoom.id, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'room_id' })
  lessonRoom: LessonRoomEntity;
}
