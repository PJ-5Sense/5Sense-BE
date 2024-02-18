import { HardDeleteBaseEntity } from 'src/database/base.entity';
import { LessonEntity } from 'src/lesson/entities/lesson.entity';
import { RoomEntity } from 'src/room/entities/room.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'room_reservation' })
export class RoomReservationEntity extends HardDeleteBaseEntity {
  @Column({ name: 'lesson_id', type: 'bigint', unsigned: true })
  lessonId: number;

  @Column({ name: 'room_id', type: 'bigint', unsigned: true })
  roomId: number;

  @ManyToOne(() => LessonEntity, lesson => lesson.id, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'lesson_id' })
  lesson: LessonEntity;

  @ManyToOne(() => RoomEntity, room => room.id, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'room_id' })
  room: RoomEntity;

  @Column({ type: 'datetime', precision: 6, name: 'start_date', comment: '예약 기간 시작일' })
  startDate: Date;

  @Column({ type: 'datetime', precision: 6, name: 'end_date', comment: '예약 기간 종료일' })
  endDate: Date;

  @Column({ type: 'time', name: 'start_time', comment: '룸 예약 시작시간' })
  startTime: string;

  @Column({ type: 'time', name: 'end_time', comment: '룸 예약 종료시간' })
  endTime: string;

  @Column({ type: 'tinyint', name: 'day_of_week', comment: '월요일 ~ 일요일 = 0 ~ 6' })
  dayOfWeek: number;
}
