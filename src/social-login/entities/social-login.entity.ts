import { HardDeleteBaseEntity } from 'src/database/base.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'social_login' })
export class SocialLoginEntity extends HardDeleteBaseEntity {
  @OneToMany(() => UserEntity, user => user.socialId)
  users: UserEntity[];

  @Column({ comment: '소셜로그인 이름 - [카카오, 구글, 네이버 ]' })
  name: string;

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
}
