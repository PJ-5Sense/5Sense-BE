import { StudentEntity } from 'src/student/entity/student.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentStatus } from 'src/lesson/types/lesson-payment-status.type';
import { DurationLessonEntity } from 'src/lesson/entity/duration-lesson.entity';

@Entity({ name: 'duration_lesson_registration' })
export class DurationLessonRegistrationEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ name: 'payment_status', type: 'enum', enum: PaymentStatus, comment: '결제 상태' })
  paymentStatus: PaymentStatus;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  // Relation columns
  @Column({ name: 'student_id', type: 'int', unsigned: true })
  studentId: number;

  @Column({ name: 'lesson_id', type: 'int', unsigned: true })
  lessonId: number;

  // Relations
  @ManyToOne(() => StudentEntity, student => student.id, { nullable: false })
  @JoinColumn({ name: 'student_id' })
  student: StudentEntity;

  @ManyToOne(() => DurationLessonEntity, lesson => lesson.id, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'lesson_id' })
  durationLesson: DurationLessonEntity;
}
