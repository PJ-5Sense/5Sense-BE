import { LessonRoomEntity } from 'src/lesson-room/entities/lesson-room.entity';
import { DurationLessonEntity } from 'src/lesson/entities/duration-lesson.entity';
import { StudentEntity } from 'src/student/entities/student.entity';
import { TeacherEntity } from 'src/teacher/entities/teacher.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SessionLessonEntity } from 'src/lesson/entities/session-lesson.entity';

@Entity({ name: 'center' })
export class CenterEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ comment: '센터명' })
  name: string;

  @Column({ comment: '센터 주소' })
  address: string;

  @Column({ name: 'main_phone', comment: '센터 대표 번호' })
  mainPhone: string;

  @Column({ comment: '프로필 이미지, 없을 시 기본 이미지 배정', nullable: true })
  profile: string;

  // 오픈시간과 종료시간 컬럼 필요함

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @DeleteDateColumn({ name: 'deleted_date' })
  deletedDate: Date;

  // Relation columns
  @Column({ name: 'user_id', type: 'int', unsigned: true, nullable: false })
  userId: number;

  // Relations
  @OneToMany(() => DurationLessonEntity, lesson => lesson.center, { cascade: true })
  durationLessons: DurationLessonEntity[];

  @OneToMany(() => SessionLessonEntity, lesson => lesson.center, { cascade: true })
  sessionLessons: SessionLessonEntity[];

  @OneToMany(() => StudentEntity, student => student.center, { cascade: true })
  students: StudentEntity[];

  @OneToMany(() => TeacherEntity, teacher => teacher.center, { cascade: true })
  teachers: TeacherEntity[];

  @OneToMany(() => LessonRoomEntity, room => room.center, { cascade: true })
  lessonRooms: LessonRoomEntity[];

  @ManyToOne(() => UserEntity, user => user.id, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
