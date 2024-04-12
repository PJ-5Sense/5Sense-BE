import { Injectable, InternalServerErrorException, PipeTransform } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';

@Injectable()
export class SharpPipe implements PipeTransform<Express.Multer.File, Promise<string>> {
  async transform(profile: Express.Multer.File): Promise<string | null> {
    if (!profile) return null;

    const originalName = path.parse(profile.originalname).name;
    const filename = Date.now() + '-' + originalName + '.webp';

    try {
      await sharp(profile.buffer).resize(150).webp({ effort: 3 }).toFile(path.join('./temp', filename));
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerErrorException('프로필 이미지 사이즈 및 포맷 변환에 실패했습니다.');
      }
    }
    return filename;
  }
}
