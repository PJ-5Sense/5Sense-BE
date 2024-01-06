import { JwtPayload } from 'src/auth/types/jwt-payload.type';
import { CreateCenterDto } from './dto/request/create-center.dto';

export interface ICenterService {
  create(
    createCenterDto: CreateCenterDto,
    userInfo: JwtPayload,
  ): Promise<{ name: string; address: string; mainPhone: string }>;

  findOneByUserId(userId: number): Promise<{ name: string; address: string; mainPhone: string }>;

  findOneMyCenter(userId: number, centerId: number): Promise<{ name: string; address: string; mainPhone: string }>;
}

export const CENTER_SERVICE = Symbol('CENTER_SERVICE');
