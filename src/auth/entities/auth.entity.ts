import { SoftDeleteBaseEntity } from 'src/database/base.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'auth' })
export class AuthEntity extends SoftDeleteBaseEntity {
  @Column({ name: 'social_id' })
  socialId: string;

  @Column({ name: 'social_type' })
  socialType: string;

  @Column({ name: 'social_access_token' })
  socialAccessToken: string;

  @Column({ name: 'social_refresh_token' })
  socialRefreshToken: string;

  @Column({ name: 'app_refresh_token' })
  appRefreshToken: string;

  @OneToOne(() => UserEntity, user => user.id, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: number;
}
