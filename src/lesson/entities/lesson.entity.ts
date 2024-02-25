import { CenterEntity } from 'src/center/entities/center.entity';
import { SoftDeleteBaseEntity } from 'src/database/base.entity';
import { LessonRegistrationEntity } from 'src/lesson/lesson-registration/entities/lesson-registration.entity';
import { RoomReservationEntity } from 'src/room/room-reservation/entities/room-reservation.entity';
import { TeacherEntity } from 'src/teacher/entities/teacher.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { DurationLessonEntity } from './duration-lesson.entity';
import { CategoryEntity } from '../lesson-category/entities/category.entity';

export enum LessonType {
  DURATION = 'duration',
  SESSION = 'session',
}

@Entity({ name: 'lesson' })
export class LessonEntity extends SoftDeleteBaseEntity {
  @Column({ type: 'varchar', length: 20, comment: '클래스 이름' })
  name: string;

  @Column({ type: 'enum', enum: LessonType, comment: 'Duration Class / Session Class' })
  type: LessonType;

  @Column({ type: 'varchar', length: 300, comment: '클래스 메모' })
  memo: string;

  @Column({ comment: '클래스 수강 시간(30분 단위), ex) 90 -> 90분' })
  lessonTime: number;

  @Column({ name: 'tuition_fee', comment: '클래스 수강료' })
  tuitionFee: number;

  @Column({ type: 'tinyint', comment: '클래스 수강 가능 최대 인원', unsigned: true })
  capacity: number;

  @Column({ name: 'center_id', type: 'bigint', unsigned: true })
  centerId: number;

  @Column({ name: 'teacher_id', type: 'bigint', unsigned: true })
  teacherId: number;

  @Column({ name: 'duration_lesson_id', type: 'bigint', unsigned: true, nullable: true, default: null })
  durationLessonId: number;

  @ManyToOne(() => CenterEntity, center => center.id, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'center_id' })
  center: CenterEntity;

  @ManyToOne(() => TeacherEntity, teacher => teacher.id, { nullable: false })
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeacherEntity;

  @Column({ name: 'category_id', type: 'bigint', unsigned: true })
  categoryId: number;

  @ManyToOne(() => CategoryEntity, category => category.id, { nullable: false })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @OneToMany(() => LessonRegistrationEntity, lessonRegistration => lessonRegistration.lesson, { cascade: true })
  lessonRegistrations: LessonRegistrationEntity[];

  @OneToMany(() => RoomReservationEntity, roomReservation => roomReservation.lesson, { nullable: false, cascade: true })
  roomReservations: RoomReservationEntity[];

  @OneToMany(() => DurationLessonEntity, durationLesson => durationLesson.lesson, { nullable: true })
  @JoinColumn({ name: 'duration_lesson_id' })
  durationLessons: DurationLessonEntity[];
}
