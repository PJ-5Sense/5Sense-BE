import { SoftDeleteBaseEntity } from 'src/database/base.entity';
import { LessonEntity } from 'src/lesson/entities/lesson.entity';
import { StudentEntity } from 'src/student/entities/student.entity';
import { TeacherEntity } from 'src/teacher/entities/teacher.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'center' })
export class CenterEntity extends SoftDeleteBaseEntity {
  @Column({ comment: '센터명' })
  name: string;

  @Column({ comment: '센터 주소' })
  address: string;

  @Column({ name: 'main_phone', comment: '센터 대표 번호' })
  mainPhone: string;

  @Column({ comment: '프로필 이미지, 없을 시 기본 이미지 배정', nullable: true })
  profile: string;

  @Column({ name: 'user_id', type: 'bigint', unsigned: true, nullable: true })
  userId: number;

  @OneToMany(() => StudentEntity, student => student.center, { cascade: true })
  students: StudentEntity[];

  @OneToMany(() => TeacherEntity, teacher => teacher.center, { cascade: true })
  teachers: TeacherEntity[];

  @OneToMany(() => LessonEntity, lesson => lesson.center, { cascade: true })
  lessons: LessonEntity[];

  @ManyToOne(() => UserEntity, user => user.id, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
