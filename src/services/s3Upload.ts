import { ExpressHandler, customResponse, customError } from '../interfaces/expressHandler';
import Logger from '../libs/logger';
import langs from '../constants/langs';
import multer from 'multer';
import { uploadFile } from '../libs/awsUploadFiles';
// import { uploadFileFunc } from '../libs/awsUploadFiles';

const logger = Logger.create('S3_UPLOAD_API.ts');

// Configure multer for file storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const apis: ExpressHandler[] = [
  // upload file to S3
  {
    path: '/media/upload',
    method: 'POST',
    preValidatorMiddlewares: [upload.single('file')],
    params: {
      $$strict: true,
    },
    action: async (req, res) => {
      try {
        logger.debug(req.originalUrl, req.method, req.params, req.query, req.body);

        const file = req.file;
        if (!file) return customError(res, 'No file uploaded.', langs.BAD_REQUEST, null, 400);
        const result = await uploadFile(file);
        if (!result.succeed) return customError(res, result.message, langs.BAD_REQUEST, null, 400);
        const { url, ...meta } = result?.meta || {};

        return customResponse(res, result.message, '', { url, meta });
      } catch (err: any) {
        logger.error(req.originalUrl, req.method, 'error:', err);

        return customError(res, err.message, langs.INTERNAL_SERVER_ERROR, null);
      }
    },
  },
];
export default apis;
