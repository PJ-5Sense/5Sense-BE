import { CenterEntity } from 'src/center/entities/center.entity';
import { SoftDeleteBaseEntity } from 'src/database/base.entity';
import { LessonCategoryEntity } from 'src/lesson-category/entities/lesson-category.entity';
import { LessonRegistration } from 'src/lesson-registration/entities/lesson-registration.entity';
import { TeacherEntity } from 'src/teacher/entities/teacher.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'lesson' })
export class DurationLessonEntity extends SoftDeleteBaseEntity {
  @Column({ type: 'varchar', length: 20, comment: '클래스 이름' })
  name: string;

  @Column({ type: 'datetime', precision: 6, name: 'start_date', comment: '클래스 시작일' })
  startDate: Date;

  @Column({ type: 'datetime', precision: 6, name: 'end_date', comment: '클래스 종료일' })
  endDate: Date;

  // enum으로 관리해야하나?
  @Column({ name: 'start_time', comment: '클래스 시작 시간' })
  startTime: Date;

  @Column({ name: 'end_time', comment: '클래스 종료 시간' })
  endTime: Date;

  @Column({ name: 'repeat_date', comment: '반복 요일 ex) 월, 화, 수' })
  repeatDate: string;

  @Column({ type: 'varchar', length: 300, comment: '클래스 메모' })
  memo: string;

  @Column({ name: 'tuition_fee', comment: '클래스 수강료, 숫자로만 값을 받고 문자열로 저장' })
  tuitionFee: string;

  @ManyToOne(() => CenterEntity, center => center.id, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'center_id' })
  center: number;

  @ManyToOne(() => TeacherEntity, teacher => teacher.id, { nullable: false })
  @JoinColumn({ name: 'teacher_id' })
  teacher: number;

  @OneToMany(() => LessonRegistration, lessonRegistration => lessonRegistration.lesson, { cascade: true })
  lessonRegistrations: LessonRegistration[];

  @OneToMany(() => LessonCategoryEntity, lessonCategory => lessonCategory.lesson, { cascade: true })
  lessonCategories: LessonCategoryEntity[];
}
