import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { HardDeleteBaseEntity } from 'src/database/base.entity';
import { UserEntity } from 'src/user/entities/user.entity';

/**
 * 유저 접속 정보
 *
 */
@Entity({ name: 'auth' })
export class AuthEntity extends HardDeleteBaseEntity {
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
