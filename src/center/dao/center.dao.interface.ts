import { CreateCenterDto } from '../dto/request/create-center.dto';
import { CenterEntity } from '../entities/center.entity';

export interface ICenterDao {
  create(createCenterDto: CreateCenterDto, userId: number): Promise<CenterEntity>;
  findOneByUserId(userId: number): Promise<CenterEntity>;
}

export const CENTER_DAO = Symbol('CENTER_DAO');
