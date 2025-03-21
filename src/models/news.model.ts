import mongoose from 'mongoose';
import { I_News } from '../interfaces/news';

const testSchema = new mongoose.Schema<I_News>(
  {
    titleImage: String,
    titleVn: String,
    descriptionVn: String,
    titleEn: String,
    summaryEn: String,
    summaryVn: String,
    descriptionEn: String,
    group: String,
    tags: [String],

    createdAt: Date,
    createdBy: String,
    updatedAt: Date,
    updatedBy: String,
    viewCount: {
      type: Number,
      default: 0,
    }
  },
  { collection: 'news' },
);
const model = mongoose.model('news', testSchema);
export default model;
