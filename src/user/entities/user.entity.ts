import { CenterEntity } from 'src/center/entities/center.entity';
import { SocialLoginEntity } from './../../social-login/entities/social-login.entity';
import { SoftDeleteBaseEntity } from 'src/database/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends SoftDeleteBaseEntity {
  @ManyToOne(() => SocialLoginEntity, socialLogin => socialLogin.users)
  @JoinColumn({ name: 'social_id' })
  socialId: SocialLoginEntity;

  @OneToMany(() => CenterEntity, center => center.user)
  centers: CenterEntity[];

  @Column({ comment: '유저 이름' })
  name: string;

  @Column({ comment: '유저 이메일' })
  email: string;
}
