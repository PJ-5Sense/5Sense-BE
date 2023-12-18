import { AuthEntity } from 'src/auth/entities/auth.entity';
import { CenterEntity } from 'src/center/entities/center.entity';
import { SoftDeleteBaseEntity } from 'src/database/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

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

  @Column({ name: 'center_id', type: 'bigint', unsigned: true, nullable: true })
  centerId: number;

  @OneToOne(() => CenterEntity, center => center.id, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'center_id' })
  center: CenterEntity;

  @Column({ name: 'social_id', nullable: false })
  socialId: string;

  @OneToOne(() => AuthEntity, social => social.socialId, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'social_id' })
  social: AuthEntity;
}
