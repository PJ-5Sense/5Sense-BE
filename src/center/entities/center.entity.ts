import { SoftDeleteBaseEntity } from 'src/database/base.entity';
import { LessonEntity } from 'src/lesson/entities/lesson.entity';
import { StudentEntity } from 'src/student/entities/student.entity';
import { TeacherEntity } from 'src/teacher/entities/teacher.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'center' })
export class CenterEntity extends SoftDeleteBaseEntity {
  @ManyToOne(() => UserEntity, user => user.centers)
  user: UserEntity;

  @OneToMany(() => StudentEntity, students => students.center)
  students: StudentEntity[];

  @OneToMany(() => TeacherEntity, teachers => teachers.center)
  teachers: TeacherEntity[];

  @OneToMany(() => LessonEntity, lessons => lessons.center)
  lessons: LessonEntity[];

  @Column({ comment: '센터명' })
  name: string;

  @Column({ comment: '센터 주소' })
  address: string;

  @Column({ name: 'main_phone', comment: '센터 대표 번호' })
  mainPhone: string;

  @Column({ comment: '프로필 이미지, 없을 시 기본 이미지 배정' })
  profile: string;
}
