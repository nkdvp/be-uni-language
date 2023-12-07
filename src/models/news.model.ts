import mongoose from 'mongoose';
import { I_News } from '../interfaces/news';

const testSchema = new mongoose.Schema<I_News>(
  {
    title: String,
    description: String,
    group: String,
    tags: [String],

    createdAt: Date,
    createdBy: String,
    updatedAt: Date,
    updatedBy: String,
  },
  { collection: 'news' },
);
const model = mongoose.model('news', testSchema);
export default model;