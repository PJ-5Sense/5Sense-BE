import { CenterEntity } from 'src/center/entities/center.entity';
import { HardDeleteBaseEntity } from 'src/database/base.entity';
import { LessonRegistration } from 'src/lesson-registration/entities/lesson-registration.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'student' })
export class StudentEntity extends HardDeleteBaseEntity {
  @Column({ comment: '학생 이름' })
  name: string;

  @Column({ comment: '학생 휴대전화 번호' })
  phone: string;

  @Column({ comment: '학생 성별' })
  gender: string;

  @Column({ comment: '프로필 이미지' })
  profile: string;

  @ManyToOne(() => CenterEntity, center => center.id, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'center_id' })
  center: number;

  @OneToMany(() => LessonRegistration, lessonRegistration => lessonRegistration.student)
  lessonRegistrations: LessonRegistration[];
}
