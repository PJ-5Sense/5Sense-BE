import { Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';

@Injectable()
export class SharpPipe implements PipeTransform<Express.Multer.File, Promise<string>> {
  async transform(profile: Express.Multer.File): Promise<string | null> {
    if (!profile) return null;
    const originalName = path.parse(profile.originalname).name;
    const filename = Date.now() + '-' + originalName + '.webp';

    await sharp(profile.buffer).resize(800).webp({ effort: 3 }).toFile(path.join('./temp', filename));

    return filename;
  }
}
