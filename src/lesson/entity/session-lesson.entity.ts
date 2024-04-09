import { CenterEntity } from 'src/center/entity/center.entity';
import { CategoryEntity } from 'src/lesson-category/entity/category.entity';
import { SessionLessonRegistrationEntity } from 'src/lesson-registration/entitiy/session-registration.entity';
import { TeacherEntity } from 'src/teacher/entity/teacher.entity';
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

@Entity({ name: 'session_lesson' })
export class SessionLessonEntity {
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

  @Column({ type: 'tinyint', comment: '클래스 수강 가능 최대 인원', unsigned: true, default: 0 })
  capacity: number;

  @Column({ name: 'total_sessions', type: 'tinyint', comment: '클래스 총 회차 수', nullable: false, unsigned: true })
  totalSessions: number;

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
  center: CenterEntity;

  @ManyToOne(() => TeacherEntity, teacher => teacher.id, { nullable: false })
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeacherEntity;

  @OneToMany(() => SessionLessonRegistrationEntity, sessionRegistration => sessionRegistration.sessionLesson)
  sessionRegistrations: SessionLessonRegistrationEntity[];

  @ManyToOne(() => CategoryEntity, category => category.id, { nullable: false })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;
}
