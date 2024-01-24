import fs from 'fs';
import Logger from './logger';

const logger = Logger.create('FILE_HELPER.TS');

const writeFile = (data: any, nameFile: string) => {
  try {
    fs.writeFile(nameFile, data, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('File written successfully.');
      }
    });
  } catch (err: any) {
    logger.error('write file failed: ', err.message);
  }
};
