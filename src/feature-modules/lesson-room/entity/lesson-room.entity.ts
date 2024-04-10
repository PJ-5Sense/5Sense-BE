import { CenterEntity } from 'src/feature-modules/center/entity/center.entity';
import { HardDeleteBaseEntity } from 'src/common/database/base.entity';
import { DurationLessonScheduleEntity } from 'src/feature-modules/lesson-schedule/entity/duration-lesson-schedule.entity';
import { SessionLessonScheduleEntity } from 'src/feature-modules/lesson-schedule/entity/session-lesson-schedule.entity';
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
  durationSchedules: DurationLessonScheduleEntity[];

  @OneToMany(() => SessionLessonScheduleEntity, sessionSchedule => sessionSchedule.lessonRoom, {
    nullable: false,
    cascade: true,
  })
  sessionSchedules: SessionLessonScheduleEntity[];
}
