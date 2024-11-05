import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createReadStream, writeFileSync } from 'fs';

export type S3Config = {
  credentials: { accessKeyId: string; secretAccessKey: string };
  region: string;
};

/**
 * 내부 리소스는 S3 SDK를 이용해서 업로드 및 가져옴
 */
@Injectable()
export class S3Helper {
  private s3Client: S3Client;
  private AWS_S3_BUCKET: string;
  private AWS_S3_BASE_OBJECT_KEY: string;
  private AWS_S3_BASE_URL: string;
  private readonly logger = new Logger(S3Helper.name);
  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client(this.configService.get('S3_CONFIG'));
    const { AWS_S3_BUCKET, AWS_S3_BASE_OBJECT_KEY, AWS_S3_BASE_URL } = this.configService.get('AWS_CONFIG');

    this.AWS_S3_BUCKET = AWS_S3_BUCKET;
    this.AWS_S3_BASE_OBJECT_KEY = AWS_S3_BASE_OBJECT_KEY;
    this.AWS_S3_BASE_URL = AWS_S3_BASE_URL;
  }

  /**
   * S3 path 구성 : https://[bucketName].S3_PATH.com/[keyPath]
   * @param bucketName 파일을 업로드할 S3 버킷의 이름을 지정합니다.
   * (EX. )
   * @param filePathInBucket 업로드된 파일이 저장될 S3 버킷 내의 경로 및 파일명을 지정합니다.
   * (EX. `{객체 경로}/{파일}`)
   * @param filePath 로컬 시스템에서 업로드할 파일의 경로와 파일로 구성됩니다.
   * (EX. /localPath/file)
   * @returns 업로드 된 S3 URL
   */
  async uploadFile(
    keyPath: string,
    sourcefile: string,
    fileDir: string,
    contentType: string,
    outputPathType: 'all' | 'sub' = 'all',
  ): Promise<string> {
    try {
      this.logger.log(`S3 스토리지에 저장하기, 저장되는 파일 위치 => ${fileDir}`);

      const fileStream = createReadStream(`${fileDir}/${sourcefile}`);
      const s3SubPath = `${this.AWS_S3_BASE_OBJECT_KEY}/${keyPath}/${sourcefile}`;
      const command = new PutObjectCommand({
        Bucket: this.AWS_S3_BUCKET,
        Key: s3SubPath,
        Body: fileStream,
        ContentType: contentType,
      });

      await this.s3Client.send(command);
      if (outputPathType === 'sub') {
        return s3SubPath;
      }

      return `${this.AWS_S3_BASE_URL}/${s3SubPath}`;
    } catch (err) {
      throw new InternalServerErrorException(`S3 업로드 실패`);
    }
  }

  /**
   *
   * @param bucketName 파일을 업로드할 S3 버킷의 이름을 지정합니다.
   * (EX. https://[bucketName].S3_PATH.com)
   * @param target
   * @param source
   */
  async getFile(target: string, source: string) {
    try {
      const command = new GetObjectCommand({
        Bucket: this.AWS_S3_BUCKET,
        Key: target,
      });
      const { Body } = await this.s3Client.send(command);

      const stream = await Body.transformToByteArray();

      writeFileSync(source, stream);
    } catch (err) {
      throw new InternalServerErrorException('S3에서 리소스 가져오기 실패');
    }
  }
}
