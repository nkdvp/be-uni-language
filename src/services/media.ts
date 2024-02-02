import { ExpressHandler, customResponse, customError } from '../interfaces/expressHandler';
import Logger from '../libs/logger';
import langs from '../constants/langs';
import upload, { UploadedFile } from 'express-fileupload';

const logger = Logger.create('media.ts');
const apis: ExpressHandler[] = [
  // get a media
  {
    path: '/media/:path',
    method: 'GET',
    params: {
      $$strict: true,
    },
    action: async (req, res) => {
      try {
        logger.debug(req.originalUrl, req.method, req.params, req.query, req.body);

        return customResponse(res, '', '', null);
      } catch (err: any) {
        logger.error(req.originalUrl, req.method, 'error:', err);

        return customError(res, err.message, langs.INTERNAL_SERVER_ERROR, null);
      }
    },
  },
  // create a media and return link
  {
    path: '/media',
    method: 'POST',
    params: {
      $$strict: true,
    },
    action: async (req, res) => {
      try {
        logger.debug(req.originalUrl, req.method, req.params, req.query, req.body);

        

        return customResponse(res, '', '', null);
      } catch (err: any) {
        logger.error(req.originalUrl, req.method, 'error:', err);

        return customError(res, err.message, langs.INTERNAL_SERVER_ERROR, null);
      }
    },
  },
  // example update media file
  {
    path: '/test',
    postValidatorMiddlewares: [
      upload({
        limits: { fileSize: 100 * 1024 * 1024 },
        useTempFiles: true,
        tempFileDir: './tmp',
        debug: true
      }),
    ],
    params: { $$strict: true },
    method: 'POST',
    action: async (req, res) => {
      try {
        logger.info(req.originalUrl, req.method, req.params, req.query, req.body);

        if (!req.files) return customError(res, 'No File Uploaded', langs.BAD_REQUEST, null, 400);
        const allFile = Object.keys(req.files);
        const filesArray: Array<any> = [];
        allFile.forEach((name: string) => {
          logger.info('file name: ', name);
          if (Array.isArray(req.files[name])) {
            const arr: any = req.files[name];
            arr.forEach((item: any) => {
              // if (mimeExcel.includes(item.mimetype))
              filesArray.push(item);
            });
          } else {
            // one file at time
            logger.info('this is one file: ');
            const file = req.files[name] as UploadedFile;
            // if (mimeExcel.includes(file.mimetype))
            filesArray.push(file);
            file.mv(`./src/files/${file.name}`, (err) => {
              if (err) {
                logger.error('save file failed: ', err);

                return res.status(500).send(err);
              }
              logger.debug('file uploaded');
            });
            // await writeFile('./src/${name}', file, name);
          }
        });
        logger.debug(filesArray.length); // accept excel only
        if (filesArray.length === 0)
          return customError(res, 'No File Found', langs.BAD_REQUEST, null, 400);
        const result: any[] = [];
        // excelArray.forEach((file: UploadedFile) => {
        //   logger.info('file', file.name);
        //   importExcelStores(file, <string>token);
        // });
        for (const file of filesArray) {
          //.(file: UploadedFile) => {
          logger.info('file', file.name);
        }

        return customResponse(res, '', '', result);
      } catch (err: any) {
        logger.error(req.originalUrl, req.method, 'error:', err);

        return customError(res, err.message, langs.INTERNAL_SERVER_ERROR, null);
      }
    },
  },
];
export default apis;
