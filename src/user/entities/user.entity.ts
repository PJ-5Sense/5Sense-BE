import { SoftDeleteBaseEntity } from 'src/database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends SoftDeleteBaseEntity {
  @Column({ comment: '유저 이름' })
  name: string;

  @Column({ comment: '유저 이메일' })
  email: string;

  @Column({ comment: '프로필 사진 (필수 아님)', nullable: true })
  profile: string;

  @Column({ comment: '핸드폰 번호 (필수 아님)', nullable: true })
  phone: string;
}
