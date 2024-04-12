import { ConfigService } from '@nestjs/config';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCenterDTO } from './dto/request/create-center.dto';
import { JwtPayload } from 'src/feature-modules/auth/type/jwt-payload.type';
import { LessonRoomService } from 'src/feature-modules/lesson-room/lesson-room.service';
import { CenterRepository } from './center.repository';
import { unlinkSync } from 'fs';
import { UpdateCenterDTO } from './dto/request/update-center.dto';
import { S3Helper } from 'src/common/helper/s3.helper';
import { ResponseCenterDTO } from './dto/response/create-center.dto';

@Injectable()
export class CenterService {
  constructor(
    private readonly centerRepository: CenterRepository,
    private readonly lessonRoomService: LessonRoomService,
    private readonly awsS3Helper: S3Helper,
    private readonly configService: ConfigService,
  ) {}
  async create(createCenterDTO: CreateCenterDTO, userInfo: JwtPayload) {
    const existCenter = await this.findOneByUserId(userInfo.userId);

    if (existCenter) throw new InternalServerErrorException('More than one center cannot be registered at this time');
    if (userInfo.centerId)
      throw new InternalServerErrorException('More than one center cannot be registered at this time');

    const profile = this.configService.get('DEFAULT_PROFILE');
    const center = await this.centerRepository.create(createCenterDTO, userInfo.userId, profile);

    //  센터 등록 시, 1개의 룸 추가 필요함(리팩토링 필요함)
    await this.lessonRoomService.addDefaultRoomForNewCenter(center.id);

    return new ResponseCenterDTO(center);
  }

  async findOneByUserId(userId: number) {
    if (!userId) return null;
    return await this.centerRepository.findOneByUserId(userId);
  }

  async findOneMyCenter(userId: number, centerId: number) {
    const myCenter = await this.centerRepository.findOneMyCenter(userId, centerId);

    return new ResponseCenterDTO(myCenter);
  }

  async updateCenter(profile: string | null, updateCenterDTO: UpdateCenterDTO, userInfo: JwtPayload) {
    const updateData = { ...updateCenterDTO, ...(profile && { profile: profile }) };
    let s3URL = null;

    if (Object.keys(updateData).length === 0) {
      throw new BadRequestException('업데이트 할 데이터가 없습니다.');
    }

    if (profile) {
      // TODO : 기존 S3에 존재하던 리소스를 삭제하는 작업이 필요함
      s3URL = await this.awsS3Helper.uploadFile('profile', profile, './temp', 'image/webp', 'all');
    }

    const center = await this.centerRepository.updateCenter(s3URL, updateCenterDTO, userInfo);

    this.deleteLocalFile('./temp/' + profile);

    return new ResponseCenterDTO(center);
  }

  deleteLocalFile(filePath: string): void {
    try {
      // 업로드 파일 삭제 (use "fs" module)
      unlinkSync(filePath);
    } catch (error) {
      console.error('Failed to delete local file', error);
    }
  }
}
