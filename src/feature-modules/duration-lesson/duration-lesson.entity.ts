import { CenterEntity } from 'src/feature-modules/center/entity/center.entity';
import { CategoryEntity } from 'src/feature-modules/lesson-category/entity/category.entity';
import { TeacherEntity } from 'src/feature-modules/teacher/entity/teacher.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DurationLessonScheduleEntity } from '../duration-lesson-registration/entity/duration-lesson-schedule.entity';
import { DurationLessonRegistrationEntity } from '../duration-lesson-registration/entity/duration-registration.entity';
import { BillingPaymentEntity } from '../billing-payment/entity/billing-payment.entity';

@Entity({ name: 'duration_lesson' })
export class DurationLessonEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 20, comment: '클래스 이름' })
  name: string;

  @Column({ type: 'varchar', length: 300, comment: '클래스 메모' })
  memo: string;

  @Column({ name: 'tuition_fee', comment: '클래스 수강료' })
  tuitionFee: number;

  @Column({ name: 'is_closed', type: 'boolean', comment: '클래스 종료 여부', default: false })
  isClosed: boolean;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @DeleteDateColumn({ name: 'deleted_date' })
  deletedDate: Date;

  // Relation columns
  @Column({ name: 'center_id', type: 'int', unsigned: true })
  centerId: number;

  @Column({ name: 'teacher_id', type: 'int', unsigned: true })
  teacherId: number;

  @Column({ name: 'category_id', type: 'int', unsigned: true })
  categoryId: number;

  // Relations
  @ManyToOne(() => CenterEntity, center => center.id, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'center_id' })
  // TODO : 센터가 지워지면 삭제가 되는지 확인 ( 하드 딜리트 시 삭제되는지 확인해야함, 소프트는 남는거를 봐야하고)
  center: CenterEntity;

  @OneToMany(() => DurationLessonRegistrationEntity, durationRegistration => durationRegistration.durationLesson, {
    nullable: false,
  })
  durationRegistrations: DurationLessonRegistrationEntity[];

  @OneToMany(() => DurationLessonScheduleEntity, durationSchedule => durationSchedule.durationLesson)
  durationSchedules: DurationLessonScheduleEntity[];

  @OneToMany(() => BillingPaymentEntity, billingPayment => billingPayment.durationLesson)
  billingPayments: BillingPaymentEntity[];

  @ManyToOne(() => TeacherEntity, teacher => teacher.id, { nullable: false })
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeacherEntity;

  @ManyToOne(() => CategoryEntity, category => category.id, { nullable: false })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;
}
