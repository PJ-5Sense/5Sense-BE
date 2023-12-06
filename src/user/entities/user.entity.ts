import { CenterEntity } from 'src/center/entities/center.entity';
import { SocialLoginEntity } from './../../social-login/entities/social-login.entity';
import { SoftDeleteBaseEntity } from 'src/database/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends SoftDeleteBaseEntity {
  @Column({ comment: '유저 이름' })
  name: string;

  @Column({ comment: '유저 이메일' })
  email: string;

  @Column({
    name: 'access_token',
    comment: '소셜 로그인 시 발급되는 엑세스 토큰, 각 소셜로그인 기능을 이용할 때 사용됨',
  })
  accessToken: string;

  @Column({
    name: 'refresh_token',
    comment: '소셜 로그인 시 발급되는 리프레쉬 토큰, 엑세스 토큰을 재발급 기능을 이용할 때 사용됨',
  })
  refreshToken: string;

  @Column({ name: 'social_id', type: 'bigint', unsigned: true })
  socialId: string;

  @ManyToOne(() => SocialLoginEntity, socialLogin => socialLogin.users, { nullable: true })
  @JoinColumn({ name: 'social_id' })
  social: SocialLoginEntity;

  @OneToMany(() => CenterEntity, center => center.user)
  centers: CenterEntity[];
}
