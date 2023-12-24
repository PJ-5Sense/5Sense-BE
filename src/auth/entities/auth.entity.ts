import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { SocialType } from '../types/social.type';
import { HardDeleteBaseEntity } from 'src/database/base.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity({ name: 'auth' })
export class AuthEntity extends HardDeleteBaseEntity {
  @Column({ name: 'social_id' })
  socialId: string;

  @Column({ type: 'enum', enum: SocialType, name: 'social_type' })
  socialType: SocialType;

  @Column({ name: 'social_access_token', nullable: true })
  socialAccessToken: string;

  @Column({ name: 'social_refresh_token', nullable: true })
  socialRefreshToken: string;

  @Column({ name: 'app_refresh_token', nullable: true })
  appRefreshToken: string;

  @Column({ name: 'user_agent', nullable: true })
  userAgent: string;

  @Column({ name: 'user_id', type: 'bigint', unsigned: true, nullable: false })
  userId: number;

  @ManyToOne(() => UserEntity, user => user.id, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
