import { HardDeleteBaseEntity } from 'src/database/base.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'social_login' })
export class SocialLoginEntity extends HardDeleteBaseEntity {
  @OneToMany(() => UserEntity, user => user.socialId)
  users: UserEntity[];

  @Column({ comment: '소셜로그인 이름 - [카카오, 구글, 네이버 ]' })
  name: string;
}
