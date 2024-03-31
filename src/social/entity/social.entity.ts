import { UserEntity } from 'src/user/entity/user.entity';
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

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  //  Relation columns
  @Column({ name: 'user_id', type: 'int', unsigned: true, nullable: false })
  userId: number;

  // Relations
  @ManyToOne(() => UserEntity, user => user.id, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
