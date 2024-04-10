import { LessonRoomEntity } from 'src/feature-modules/lesson-room/entity/lesson-room.entity';
import { DurationLessonEntity } from 'src/feature-modules/lesson/entity/duration-lesson.entity';
import { StudentEntity } from 'src/feature-modules/student/entity/student.entity';
import { TeacherEntity } from 'src/feature-modules/teacher/entity/teacher.entity';
import { UserEntity } from 'src/feature-modules/user/entity/user.entity';
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
import { SessionLessonEntity } from 'src/feature-modules/lesson/entity/session-lesson.entity';

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

  @Column({ comment: '영업 시작 시간' })
  open: string;

  @Column({ comment: '영업 종료 시간' })
  close: string;

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
