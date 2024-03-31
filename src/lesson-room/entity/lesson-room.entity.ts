import { CenterEntity } from 'src/center/entity/center.entity';
import { HardDeleteBaseEntity } from 'src/database/base.entity';
import { DurationLessonScheduleEntity } from 'src/lesson/entity/duration/duration-lesson-schedule.entity';
import { SessionLessonScheduleEntity } from 'src/lesson/entity/session/session-lesson-schedule.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'lesson_room' })
export class LessonRoomEntity extends HardDeleteBaseEntity {
  @Column()
  name: string;

  @Column()
  capacity: number;

  // Relation columns
  @Column({ name: 'center_id', type: 'int', unsigned: true })
  centerId: number;

  // Relations
  @ManyToOne(() => CenterEntity, center => center.id, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'center_id' })
  center: CenterEntity;

  @OneToMany(() => DurationLessonScheduleEntity, durationSchedule => durationSchedule.lessonRoom, {
    nullable: false,
    cascade: true,
  })
  durationSchedule: DurationLessonScheduleEntity[];

  @OneToMany(() => SessionLessonScheduleEntity, sessionSchedule => sessionSchedule.lessonRoom, {
    nullable: false,
    cascade: true,
  })
  sessionSchedule: SessionLessonScheduleEntity[];
}
