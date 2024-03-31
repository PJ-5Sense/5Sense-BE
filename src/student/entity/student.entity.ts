import { CenterEntity } from 'src/center/entity/center.entity';
import { DurationLessonRegistrationEntity } from 'src/lesson/entity/duration/duration-registration.entity';
import { SessionLessonRegistrationEntity } from 'src/lesson/entity/session/session-registration.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'student' })
export class StudentEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ comment: '학생 이름', length: 20 })
  name: string;

  @Column({ comment: '학생 휴대전화 번호', length: 11 })
  phone: string;

  @Column({ comment: '특이사항', length: 300 })
  particulars: string;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  // Relation columns
  @Column({ name: 'center_id', type: 'int', unsigned: true, nullable: false })
  centerId: number;

  // Relations
  @ManyToOne(() => CenterEntity, center => center.id, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'center_id' })
  center: CenterEntity;

  @OneToMany(() => SessionLessonRegistrationEntity, sessionRegistrations => sessionRegistrations.student)
  sessionRegistrations: SessionLessonRegistrationEntity[];

  @OneToMany(() => DurationLessonRegistrationEntity, durationRegistrations => durationRegistrations.student)
  durationRegistrations: DurationLessonRegistrationEntity[];
}
