import { StudentEntity } from 'src/feature-modules/student/entity/student.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DurationLessonEntity } from 'src/feature-modules/duration-lesson/duration-lesson.entity';

@Entity({ name: 'duration_lesson_registration' })
export class DurationLessonRegistrationEntity {
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