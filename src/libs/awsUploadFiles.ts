import Logger from './logger';
import { I_FunctionResult } from '../interfaces/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const logger = Logger.create('AWS_UPLOAD_FILE.ts');
// Configure AWS S3
const BUCKET_NAME = process.env.S3_BUCKET_NAME;
const S3_REGION = process.env.S3_REGION;
const s3Client = new S3Client({
  region: S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
});

export async function uploadFile(file: Express.Multer.File): Promise<I_FunctionResult> {
  try {
    const presentTime = new Date();
    const key = `${presentTime.getUTCFullYear()}-${presentTime.getUTCMonth()}/${(
      file.originalname || ''
    ).replace(/ /g, '-')}`;
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });
    const url = `https://${BUCKET_NAME}.s3.${S3_REGION}.amazonaws.com/${key}`;

    const results = await s3Client.send(command);

    return {
      succeed: true,
      message: '',
      meta: {
        url,
        results,
      },
    };
  } catch (err: any) {
    logger.error('upload file failed: ', err.message);

    return {
      succeed: false,
      message: err.message,
      meta: err,
    };
  }
}
