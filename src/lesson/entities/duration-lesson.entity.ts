import { CenterEntity } from 'src/center/entities/center.entity';
import { CategoryEntity } from 'src/lesson-category/entities/category.entity';
import { DurationLessonRegistrationEntity } from 'src/lesson-registration/entities/duration-registration.entity';
import { DurationLessonScheduleEntity } from 'src/lesson-schedule/entities/duration-lesson-schedule.entity';
import { TeacherEntity } from 'src/teacher/entities/teacher.entity';
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

@Entity({ name: 'duration_lesson' })
export class DurationLessonEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 20, comment: '클래스 이름' })
  name: string;

  @Column({ type: 'varchar', length: 300, comment: '클래스 메모' })
  memo: string;

  @Column({ name: 'lesson_time', comment: '클래스 수강 시간(30분 단위), ex) 90 -> 90분' })
  lessonTime: number;

  @Column({ name: 'tuition_fee', comment: '클래스 수강료' })
  tuitionFee: number;

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

  @ManyToOne(() => TeacherEntity, teacher => teacher.id, { nullable: false })
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeacherEntity;

  @ManyToOne(() => CategoryEntity, category => category.id, { nullable: false })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;
}
