import mongoose from 'mongoose';
import { I_Media } from '../interfaces/media';

const mediaModelName = 'media';

const mediaSchema = new mongoose.Schema<I_Media>(
  {
    fileName: String,
    fileType: String,
    fileSize: String,
    note: String,
    link: String,

    createdAt: Date,
    createdBy: String,
    updatedAt: Date,
    updatedBy: String,
  },
  { collection: mediaModelName },
);
const model = mongoose.model(mediaModelName, mediaSchema, mediaModelName);
export default model;
