import { Request, Response } from 'express';
import * as AWS from 'aws-sdk';

// Configure AWS S3
AWS.config.update({
  region: 'your-region', // Example: 'us-west-2'
  accessKeyId: 'your-access-key-id',
  secretAccessKey: 'your-secret-access-key',
});

const s3 = new AWS.S3();

// API endpoint for file upload
const uploadFileS3 = async (req: Request, res: Response) => {
  if (!req.file) return res.status(400).send('No file uploaded.');

  const file = req.file;
  const bucketName = 'your-bucket-name';

  const params = {
    Bucket: bucketName,
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const data = await s3.upload(params).promise();
    res.send({ message: 'File uploaded successfully', location: data.Location });
  } catch (error) {
    console.log(error);
    res.status(500).send('Failed to upload file.');
  }
};
// upload.single('file')

export { uploadFileS3 };
