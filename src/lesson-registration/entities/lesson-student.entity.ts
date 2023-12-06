import { HardDeleteBaseEntity } from 'src/database/base.entity';
import { LessonEntity } from 'src/lesson/entities/lesson.entity';
import { StudentEntity } from 'src/student/entities/student.entity';
import { ChildEntity, Column, Entity, ManyToOne, TableInheritance } from 'typeorm';

@Entity({ name: 'lesson_registration' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class LessonRegistration extends HardDeleteBaseEntity {
  @ManyToOne(() => StudentEntity, student => student.lessonRegistrations)
  student: StudentEntity;

  @ManyToOne(() => LessonEntity, lesson => lesson.lessonRegistrations)
  lesson: LessonEntity;

  @Column({ name: 'payment_status', comment: '결제 상태' })
  paymentStatus: string;
}

@ChildEntity()
export class PeriodLesson extends LessonRegistration {
  @Column({
    name: 'start_date',
    comment:
      '기간반일 경우 강의 시작일, 학생이 강의를 들어간 기준일지, 학생이 들어간 해당 강의 시작일인지 고민중이며 후자일 경우 실제로 클래스에는 강의 시작일이 있어서 필요는 없어보임 ',
  })
  startDate: string;

  @Column({ name: 'end_date', comment: 'start_date와 동일' })
  endDate: string;
}

@ChildEntity()
export class SessionLesson extends LessonRegistration {
  @Column({ name: 'total_times', comment: '총 회수, 추가로 연장하면 회수가 결제한 금액의 회수만큼 늘어남' })
  totalTimes: string;

  @Column({ name: 'used_times', comment: '총 회수에서 몇회 소진했는지 기록' })
  usedTimes: string;
}
