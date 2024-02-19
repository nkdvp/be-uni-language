import { I_CommonInfo } from './common';
interface I_News extends I_CommonInfo {
  titleVn: string;
  descriptionVn: string;
  summaryVn: string;
  titleEn: string;
  descriptionEn: string;
  summaryEn: string;
  avatar: string;
  group: string;
  tags: string[];
  viewCount: number;
}


export {
  I_News,
}