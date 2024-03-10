import { AuthEntity } from 'src/auth/entities/auth.entity';
import { CenterEntity } from 'src/center/entities/center.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SocialEntity } from '../../social/entities/social.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ comment: '유저 이름' })
  name: string;

  @Column({ comment: '유저 이메일' })
  email: string;

  @Column({ comment: '프로필 사진 (필수 아님)', nullable: true })
  profile: string;

  @Column({ comment: '핸드폰 번호 (필수 아님)', nullable: true })
  phone: string;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @DeleteDateColumn({ name: 'deleted_date' })
  deletedDate: Date;

  // Relations
  @OneToMany(() => CenterEntity, center => center.user, { cascade: true })
  centers: CenterEntity[];

  @OneToMany(() => SocialEntity, social => social.user, { cascade: true })
  socials: SocialEntity[];

  @OneToMany(() => AuthEntity, auth => auth.user, { cascade: true })
  auth: AuthEntity[];
}
