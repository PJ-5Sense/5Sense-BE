import { HardDeleteBaseEntity } from 'src/database/base.entity';
import { LessonEntity } from 'src/lesson/entities/lesson.entity';
import { StudentEntity } from 'src/student/entities/student.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PaymentStatus } from 'src/lesson/types/lesson-payment-status.type';

@Entity({ name: 'lesson_registration' })
export class LessonRegistrationEntity extends HardDeleteBaseEntity {
  @ManyToOne(() => StudentEntity, student => student.id, { nullable: false })
  @JoinColumn({ name: 'student_id' })
  student: StudentEntity;

  @ManyToOne(() => LessonEntity, lesson => lesson.id, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'lesson_id' })
  lesson: LessonEntity;

  @Column({ name: 'student_id', type: 'bigint', unsigned: true })
  studentId: number;

  @Column({ name: 'lesson_id', type: 'bigint', unsigned: true })
  lessonId: number;

  @Column({ name: 'payment_status', type: 'enum', enum: PaymentStatus, comment: '결제 상태' })
  paymentStatus: PaymentStatus;

  @Column({ type: 'datetime', precision: 6, name: 'start_date', comment: '클래스 시작일' })
  startDate: Date;

  @Column({ type: 'datetime', precision: 6, name: 'end_date', comment: '클래스 종료일' })
  endDate: Date;

  @Column({ type: 'time', name: 'start_time', comment: '클래스 시작시간' })
  startTime: string;

  @Column({ type: 'time', name: 'end_time', comment: '클래스 종료시간' })
  endTime: string;
}
