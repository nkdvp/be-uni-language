import { I_CommonInfo } from './common';
interface I_News extends I_CommonInfo {
  title: string;
  description: string;
  avatar: string;
  group: string;
  tags: string[];
}


export {
  I_News,
}