import { I_CommonInfo } from './common';

interface I_Media extends I_CommonInfo {
  fileName: string;
  fileType: string;
  fileSize: string;
  note?: string;
  link: string;
}

export { I_Media };
