import { StudentEntity } from 'src/feature-modules/student/entity/student.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SessionLessonEntity } from 'src/feature-modules/session-lesson/session-lesson.entity';
import { SessionLessonScheduleEntity } from '../../session-lesson-schedule/entity/session-lesson-schedule.entity';

@Entity({ name: 'session_lesson_registration' })
export class SessionLessonRegistrationEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  // Relation columns
  @Column({ name: 'student_id', type: 'int', unsigned: true })
  studentId: number;

  @Column({ name: 'lesson_id', type: 'int', unsigned: true })
  lessonId: number;

  // Relations
  @ManyToOne(() => SessionLessonEntity, sessionLesson => sessionLesson.id, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'lesson_id' })
  sessionLesson: SessionLessonEntity;

  @ManyToOne(() => StudentEntity, student => student.id, { nullable: false })
  @JoinColumn({ name: 'student_id' })
  student: StudentEntity;

  @OneToMany(() => SessionLessonScheduleEntity, sessionLessonSchedule => sessionLessonSchedule.sessionRegistration)
  sessionSchedules: SessionLessonScheduleEntity[];
}
