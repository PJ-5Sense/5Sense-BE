import { CenterEntity } from 'src/feature-modules/center/entity/center.entity';
import { PaymentStatus } from 'src/feature-modules/combined-lesson/type/lesson-payment-status.type';
import { DurationLessonEntity } from 'src/feature-modules/duration-lesson/duration-lesson.entity';
import { SessionLessonEntity } from 'src/feature-modules/session-lesson/session-lesson.entity';
import { StudentEntity } from 'src/feature-modules/student/entity/student.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'billing-payment' })
export class BillingPaymentEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ name: 'payment_status' })
  paymentStatus: PaymentStatus;

  // Relation columns
  @Column({ name: 'center_id', type: 'int', unsigned: true, nullable: false })
  centerId: number;

  @Column({ name: 'student_id', type: 'int', unsigned: true, nullable: false })
  studentId: number;

  @Column({ name: 'duration_lesson_id', type: 'int', unsigned: true, nullable: true })
  durationLessonId: number;

  @Column({ name: 'session_lesson_id', type: 'int', unsigned: true, nullable: true })
  sessionLessonId: number;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  // Relations
  @ManyToOne(() => CenterEntity, center => center.id)
  @JoinColumn({ name: 'center_id' })
  center: CenterEntity;

  @ManyToOne(() => StudentEntity, center => center.id)
  @JoinColumn({ name: 'student_id' })
  student: StudentEntity;

  @ManyToOne(() => DurationLessonEntity, center => center.id, { nullable: true })
  @JoinColumn({ name: 'duration_lesson_id' })
  durationLesson: DurationLessonEntity;

  @ManyToOne(() => SessionLessonEntity, center => center.id, { nullable: true })
  @JoinColumn({ name: 'session_lesson_id' })
  sessionLesson: SessionLessonEntity;
}

// 통계는 어떻게?
// 통계 테이블을 하나 만든 뒤, 기본 payment에 반영이 되었는지 안되엇는지에 대한 여부를 남긴다.
// payment에 대해서 결제 상태가 환불 취소?인지에 대해서 여부를 남겨야하는데
