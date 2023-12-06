import { CenterEntity } from 'src/center/entities/center.entity';
import { SoftDeleteBaseEntity } from 'src/database/base.entity';
import { LessonCategoryEntity } from 'src/lesson-category/entities/lesson-category.entity';
import { LessonRegistration } from 'src/lesson-registration/entities/lesson-student.entity';
import { TeacherEntity } from 'src/teacher/entities/teacher.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'lesson' })
export class LessonEntity extends SoftDeleteBaseEntity {
  @ManyToOne(() => CenterEntity, center => center.lessons)
  center: CenterEntity;

  @ManyToOne(() => TeacherEntity, teachers => teachers.lessons)
  teachers: TeacherEntity;

  @OneToMany(() => LessonCategoryEntity, lessonCategory => lessonCategory.lesson)
  categories: LessonCategoryEntity[];

  @OneToMany(() => LessonRegistration, lessonRegistration => lessonRegistration.lesson)
  lessonRegistrations: LessonRegistration[];

  @Column({ comment: '클래스 이름' })
  name: string;

  @Column({ comment: '기간반 / 회차반' })
  type: string;

  @Column({ name: 'start_date', comment: '클래스 시작일' })
  startDate: string;

  @Column({ name: 'end_date', comment: '클래스 종료일' })
  endDate: string;

  @Column({ comment: '클래스 메모' })
  memo: string;

  @Column({ name: 'tuition_fee', comment: '수강료' })
  tuitionFee: string;

  @Column({ name: 'repeat_date', comment: '반복 요일 ex) 월, 화, 수' })
  repeatDate: string;
}
