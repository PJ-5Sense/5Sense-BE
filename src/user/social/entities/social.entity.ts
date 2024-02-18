import { UserEntity } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
@Entity({ name: 'social' })
export class SocialEntity {
  @PrimaryColumn({ name: 'social_id' })
  socialId: string;

  @Column({ name: 'social_type' })
  socialType: string;

  @Column({ name: 'social_access_token' })
  socialAccessToken: string;

  @Column({ name: 'social_refresh_token' })
  socialRefreshToken: string;

  @Column({ name: 'user_id', type: 'bigint', unsigned: true, nullable: false })
  userId: number;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @ManyToOne(() => UserEntity, user => user.id, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
