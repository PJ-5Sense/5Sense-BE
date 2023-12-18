import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { SocialType } from '../types/social.type';

@Entity({ name: 'auth' })
export class AuthEntity {
  @PrimaryColumn({ name: 'social_id' })
  socialId: string;

  @Column({ type: 'enum', enum: SocialType, name: 'social_type' })
  socialType: SocialType;

  @Column({ name: 'social_access_token', nullable: true })
  socialAccessToken: string;

  @Column({ name: 'social_refresh_token', nullable: true })
  socialRefreshToken: string;

  @Column({ name: 'app_refresh_token', nullable: true })
  appRefreshToken: string;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @DeleteDateColumn({ name: 'deleted_date' })
  deletedDate: Date;
}
