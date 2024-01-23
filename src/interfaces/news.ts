import { I_CommonInfo } from './common';
interface I_News extends I_CommonInfo {
  titleVn: string;
  descriptionVn: string;
  titleEn: string;
  descriptionEn: string;
  avatar: string;
  group: string;
  tags: string[];
}


export {
  I_News,
}