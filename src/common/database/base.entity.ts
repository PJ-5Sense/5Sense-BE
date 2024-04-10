import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class SoftDeleteBaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @DeleteDateColumn({ name: 'deleted_date' })
  deletedDate: Date;
}

export class HardDeleteBaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;
}
