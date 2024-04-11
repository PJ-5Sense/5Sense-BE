import { LessonRoomEntity } from 'src/feature-modules/lesson-room/entity/lesson-room.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SessionLessonRegistrationEntity } from '../../lesson-registration/entity/session-registration.entity';

@Entity({ name: 'session_lesson_schedule' })
export class SessionLessonScheduleEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'datetime', precision: 6, name: 'session_date', comment: '회차반 수업날' })
  sessionDate: Date;

  @Column({ type: 'time', name: 'start_time', comment: '클래스 시작시간' })
  startTime: string;

  @Column({ type: 'time', name: 'end_time', comment: '클래스 종료시간' })
  endTime: string;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  // Relation columns
  @Column({ name: 'room_id', nullable: false, unsigned: true })
  roomId: number;

  @Column({ name: 'session_registration_id', type: 'int', unsigned: true })
  sessionRegistrationId: number;

  // Relations
  @ManyToOne(() => SessionLessonRegistrationEntity, sessionRegistration => sessionRegistration.id, { nullable: false })
  @JoinColumn({ name: 'session_registration_id' })
  sessionRegistration: SessionLessonRegistrationEntity;

  @ManyToOne(() => LessonRoomEntity, lessonRoom => lessonRoom.id, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'room_id' })
  lessonRoom: LessonRoomEntity;
}
