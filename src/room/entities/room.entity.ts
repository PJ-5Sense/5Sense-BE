import { CenterEntity } from 'src/center/entities/center.entity';
import { HardDeleteBaseEntity } from 'src/database/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { RoomReservationEntity } from '../room-reservation/entities/room-reservation.entity';

@Entity({ name: 'room' })
export class RoomEntity extends HardDeleteBaseEntity {
  @Column()
  name: string;

  @Column()
  capacity: number;

  @Column({ name: 'center_id', type: 'bigint', unsigned: true })
  centerId: number;

  @ManyToOne(() => CenterEntity, center => center.id, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'center_id' })
  center: CenterEntity;

  @OneToMany(() => RoomReservationEntity, roomReservation => roomReservation.room, {
    nullable: false,
    cascade: true,
  })
  roomReservation: RoomReservationEntity[];
}
