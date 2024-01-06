import { CenterEntity } from 'src/center/entities/center.entity';
import { HardDeleteBaseEntity } from 'src/database/base.entity';
import { LessonRegistration } from 'src/lesson-registration/entities/lesson-registration.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'student' })
export class StudentEntity extends HardDeleteBaseEntity {
  @Column({ comment: '학생 이름', length: 20 })
  name: string;

  @Column({ comment: '학생 휴대전화 번호', length: 11 })
  phone: string;

  @Column({ comment: '특이사항', length: 300 })
  particulars: string;

  @Column({ name: 'center_id', type: 'bigint', unsigned: true, nullable: false })
  centerId: number;

  @ManyToOne(() => CenterEntity, center => center.id, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'center_id' })
  center: CenterEntity;

  // 클래스 등록 관련되서 수정이 필요함
  @OneToMany(() => LessonRegistration, lessonRegistration => lessonRegistration.student)
  lessonRegistrations: LessonRegistration[];
}
