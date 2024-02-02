// import  fs from 'fs';
// import Logger from './logger';

// const logger = Logger.create('FILE_HELPER.TS');

// const writeFile = async (path: string, data: any, nameFile: string) => {
//   try {
//     const result = fs.writeFileSync(path, data, (err: any) => {
//       if (err) {
//         console.error('Error writing to file:', err);

//         return;
//       } else {
//         console.log('File written successfully.');
//       }
//     });

//     return result;
//   } catch (err: any) {
//     logger.error('write file failed: ', err.message);
//   }
// };
// export { writeFile };
